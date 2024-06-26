const permissionsBitfield = require('../types/permissions').types
const intentsConstance = require("../types/intents").types
const userBadges = require("../types/user").badges
const applicationBadges = require("../types/application").flags
const applicationMetadataTypes = require("../types/applicationmetadata").types
const channelClass = require("../structures/singles/channels/channeldm")
const fileManager = require("../handlers/filemanager")

function getBietfielfFromPermissions(permissions){
    if(!Array.isArray(permissions)) return null
    if(!permissions[0]) return 0
    return permissions.map(perm => String(perm).toUpperCase()).reduce((a, b) => permissionsBitfield[b] ? a+permissionsBitfield[b] : a+0, 0)
}

function getIntentsFromNames(intents){
    if(!Array.isArray(intents) && typeof intents !== "string" && intents !== "ALL") return "Incorrect Intents"
    if(intents === "ALL") return Object.values(intentsConstance).reduce((a, b) => a+b, 0)

    let mappedConstanceIntents = Object.keys(intentsConstance).map(key => {
        return {
            original: key,
            mapped: key.replaceAll('_', '').toLowerCase()
        }
    })

    let mappedGivenIntents = intents.map(key => String(key).replaceAll('_', '').toLowerCase())

    return mappedConstanceIntents
    .filter(mappedConstanceIntent => mappedGivenIntents.find(mappedGivenIntent => mappedConstanceIntent.mapped === mappedGivenIntent))
    .reduce((a, b) => a += intentsConstance[b.original], 0)
}

function getArrayFromBitfield(types, bitfield){
    if(isNaN(bitfield)) return bitfield
    const ACFlags = Object.entries(types).sort((a, b) => Number(b[1]) - Number(a[1]))
    const final_p = []
    let processConvert = Number(bitfield)
    ACFlags.forEach(flag => {
        if(processConvert - flag[1] >= 0) {
            processConvert = processConvert - flag[1]
            final_p.push(flag[0])
        }
    })
    return final_p
}

function getBadges(bitfield){
    return getArrayFromBitfield(userBadges, bitfield)
}

function getIntents(bitfield){
    return getArrayFromBitfield(intentsConstance, bitfield)
}

function getApplicationFlags(bitfield){
    return getArrayFromBitfield(applicationBadges, bitfield)
}

function getApplicationMetadataType(bitfield){
    return getArrayFromBitfield(applicationMetadataTypes, bitfield)
}

function checkColor(color){
    let check = String(color).match(/^#([a-f0-9]{6}|[a-f0-9]{3})\b$/i)
    if(String(check) !== "null") return true
    else return false
}

function getPermissionsFromBitfields(bietfield){
    bietfieldNumber = Number(bietfield)
    let bietfieldEntries = Object.entries(permissionsBitfield).sort((a, b) => b[1] - a[1])
    let permissions = []
    bietfieldEntries.forEach(entry => {
        if(entry[1] <= bietfieldNumber){
            permissions.push(entry[0])
            bietfieldNumber -= entry[1]
        }
    })
    return permissions
}

function checkId(Id){
    if(isNaN(Id) || typeof Id !== "string" || Id.length > 22 || Id.length < 15) return false
    return true
}

function checkOverwrites(overwrites){
    if(!Array.isArray(overwrites)) return false
    if(overwrites.length === 0) return false
    let result_final;
    overwrites.forEach(overwrite => {
        if(result_final !== false){
            if(typeof overwrite !== "object") result_final = false
            else if(!overwrite.id || !overwrite.type || !overwrite.allow || !overwrite.deny) result_final = false
            else if(!checkId(overwrite.id)) result_final = false
            else if(typeof overwrite.type !== "number") result_final = false
            else if(typeof overwrite.allow !== "string" || isNaN(overwrite.allow)) result_final = false
            else if(typeof overwrite.deny !== "string" || isNaN(overwrite.deny)) result_final = false
            else result_final = true
        }
    })
    return result_final
}

function channelBackup(id, bot){
    let channel = {
        id,
        type: 1
    }
    return new channelClass(channel, bot)
}

function correctMessageData(options){
    if(!options) return null
    if(options && options.modal) return options
    if(typeof options !== "object" && typeof options === "string") return {content: options}
    else if(typeof options === "object" && (options.content || options.embeds || options.files || options.modal || options.components || options.sticker_ids)) return options
    else if(typeof options === "object" && (options.question || options.answers || options.duration)) return {poll: options}
    else if(typeof options === "object" && (options.description || options.title || options.fields)) return {embeds: [options]}
    else if(typeof options === "object" && (options.name || options.buffer || options.extension)) return {files: [options]}
    else if(typeof options === "object" && options.custom_id !== undefined) return {components: [options]}
    else return null
}

function presence(presence){
    let base = {activities: [], afk: false, status: "online", since: Date.now()}
    const convert = { playing: 0, streaming: 1, listening: 2, watching: 3, custom: 4, competing: 5 }
    if(typeof presence !== "object") return base
    if(presence.since && typeof presence.since === "number") base.since = Number(presence.since)
    if(typeof presence.status === "string" && (/(online|offline|dnd|idle|invisible)/gm).test(presence.status)) base.status = presence.status
    if((/offline|dnd|invisible/gm).test(presence.status)) return base
    if(Array.isArray(presence.activities)) presence.activities = presence.activities.map(activity => {
        if(typeof activity === "object" && typeof activity.name === "string" && activity.name.length < 200 && ["string", "number"].includes(typeof activity.type) && (convert[activity.type] || Object.values(convert).includes(activity.type))) return {type: convert[activity.type] || activity.type, [convert[activity.type] === 4 ? 'state' : 'name']: activity.name} }) 
    else presence.activities = []
    base.activities = presence.activities
    return base
}

function checkPoll (poll) {
    if (!poll) return null
    if (typeof poll !== 'object') return null
    if (typeof poll.question !== 'object') return null
    if (typeof poll.question.text !== 'string') return null
    if (poll.question.emoji && (typeof poll.question.emoji.name !== 'string' && typeof poll.question.emoji.id !== 'string')) return null
    if (typeof poll.duration !== 'number') return null
    if (typeof poll.layout_type !== 'number') return null
    if (typeof poll.allow_multiselect !== 'boolean') return null
    if (!Array.isArray(poll.answers) || !poll.answers.length) return null
    poll.answers = poll.answers
    .map(answer => {
        if (typeof answer.answer_id !== 'number') return null
        if (typeof answer.poll_media !== 'object') return null
        if (typeof answer.poll_media.text !== 'string') return null
        if (answer.poll_media.emoji && (typeof answer.poll_media.emoji.name !== 'string' && typeof answer.poll_media.emoji.id !== 'string')) return null
        return answer
    })
    .filter(Boolean)
    return poll
}

function checkEmbed(embeds){
    if(!embeds) return []
    if(!Array.isArray(embeds)){
        if(typeof embeds === "object" && (embeds.description || embeds.title || embeds.fields.length)) embeds = [embeds]
        else return []
    }
    let trueembeds = []
    embeds.forEach(emb => {
        if(!emb.color || typeof emb.color !== "number") emb.color = 0x000000
        if(emb.fields.length) emb.fields = emb.fields.map(field => {
            if(!field.value && !field.name) return {name: "\u200b", value: "\u200b", inline: field.inline ?? false}
            else if(!field.value) return {name: field.name, value: "\u200b", inline: field.inline ?? false}
            else if(!field.name) return {name: "\u200b", value: field.value, inline: field.inline ?? false}
            else return field
        })
        if(emb.title || emb.description || emb.fields[0]) trueembeds.push(emb)
    })
    return trueembeds
}

function checkContent(content){
    if(!content) return null
    if(typeof content !== "string") return null
    if(content.length < 1 || content.length > 2000) return null
    return content
}

function checkStickers(stickers){
    if(!stickers) return []
    if(!Array.isArray(stickers)) return []
    return stickers
}

function checkComponents(components){
    if(!components) return []
    let defcompo = [
        {
            type: 1,
            components: []
        }
    ]
    if(!Array.isArray(components)) {
        if(typeof components === "object" && (components.type)) components = [components]
        else return []
    }else{
        components.forEach(component => {
            if(component.type && component.custom_id) defcompo[0].components.push(component)
        })
    }
    return defcompo
}

function checkFiles(files){
    if(!files) return []
    if(!Array.isArray(files)){
        if(typeof files === "object" && (files.name || files.buffer || files.extension)) files = [files]
        else return []
    }
    let truefiles = []
    files.forEach(file => {
        if(file instanceof fileManager) return truefiles.push(file)
        if(!file.name || typeof file.name !== "string" || file.name.length > 200) return
        if(!file.buffer || !Buffer.isBuffer(file.buffer)) return
        if(!file.extension || typeof file.extension !== "string" || file.extension.length > 8) return
        truefiles.push(new fileManager(file))
    })
    return truefiles
}

function checkReference(reference){
    if(typeof reference !== "object") return null
    if(!reference.channel_id || !reference.message_id) return null
    if(checkId(reference.channel_id)) return null
    if(checkId(reference.message_id)) return null
    if(String(reference.fail_if_not_exist) === "undefined") reference.fail_if_not_exist = false
    return reference
}

function createError(name, error){
    if(!name || typeof name !== "string") return new Error()
    let er = new Error(`Une erreur s'est produite lors de la requête - ${name}`)
    er.content = error || null
    return er
}

function revertTypes(object){
    let objectArray = Object.entries(object)
    let newJSONObject = {}
    objectArray.forEach(objType => newJSONObject[objType[1]] = objType[0])
    return newJSONObject
}

function checkApplicationCommand (object, state, languages) {
    if(typeof object !== "object") return {errors: [{err: "invalid object"}], status: false}
    let first = checkCommands(object, state, languages)
    if(!first.status) return first
    if(object.options){
        let second = checkOptions(object, state, languages)
        if(!second.status) return second
        let third = checkChoices(object, state, languages)
        if(!third.status) return third
    }
    return {status: true}
}

function checkCommands(object, state, languages){
    let error = []
    if(!object.name){
        error.push({err: "no name"})
        return {type: "command", errors: error.length === 0 ? null : error, status: error.length === 0 ? true : false}
    }
    if(object.name.length > 32) error.push({err: "name too long", cmd: object.name})
    if(state){
        languages.forEach(la => {
            const Des_Lan = la["commands"]
            if(!Des_Lan[`${object.name}_name`]) error.push({err: "no name", cmd: object.name, langue: la.languageCode})
            else if(Des_Lan[`${object.name}_name`].length > 32) error.push({err: "name too long", cmd: object.name, langue: la.languageCode, taille: Des_Lan[`${object.name}_name`].length})
            else if(Des_Lan[`${object.name}_name`].toLowerCase() !== Des_Lan[`${object.name}_name`]) error.push({err: "character in uppercase", cmd: object.name, langue: la.languageCode})
            else if(!(/^[\w-]{1,32}$/gm).test(Des_Lan[`${object.name}_name`])) error.push({err: "name does not match regex", cmd: object.name, langue: la.languageCode})
            if(!Des_Lan[`${object.name}_description`]) error.push({cmd: object.name, err: "no description", langue: la.languageCode})
            else if(Des_Lan[`${object.name}_description`].length > 99) error.push({cmd: object.name, err: "description too long", langue: la.languageCode, taille: Des_Lan[`${object.name}_description`].length})
            if(!Des_Lan[`${object.name}_exemple`]) error.push({cmd: object.name, err: "no exemple", langue: la.languageCode})
            if(!Des_Lan[`${object.name}_composition`] && !Des_Lan[`${object.name}_usage`]) error.push({cmd: object.name, err: "no usage and composition", langue: la.languageCode})
        })
    }else{
        if(!object.description) error.push({cmd: object.name, err: "no description"})
        else if(object.description.length > 99) error.push({cmd: object.name, err: "description too long", taille: object.description.length})
        
    }
    if(object.options && !Array.isArray(object.options)) error.push({err: "options invalid", cmd: object.name})
    if(object.options && object.options.length > 25) error.push({err: "trop d'options", taille: object.options.length, cmd: object.name})
    return {type: "command", errors: error.length === 0 ? null : error, status: error.length === 0 ? true : false}
}

function checkOptions(object, state, languages){
    let error = []
    object.options.forEach(option => {
        if(!option.name) error.push({err: "no option name", cmd: object.name})
        else{
            if(!option.name.length > 32) error.push({opt: option.name, err: "name too long", taille: option.name.length, cmd: object.name})
            if(!(/^[\w-]{1,32}$/gm).test(option.name)) error.push({opt: option.name, err: "name does not match regex", taille: option.name.length, cmd: object.name})
            if(state){
                languages.forEach(la => {
                    const Des_Lan = la["options"]
                    if(!Des_Lan[`${object.name}_${option.name}_name`]) error.push({err: "no name", cmd: object.name, langue: la.languageCode, opt: option.name})
                    else if(Des_Lan[`${object.name}_${option.name}_name`].length > 32) error.push({err: "name too long", cmd: object.name, langue: la.languageCode, opt: option.name, taille: Des_Lan[`${object.name}_${option.name}_name`].length})
                    else if(Des_Lan[`${object.name}_${option.name}_name`].toLowerCase() !== Des_Lan[`${object.name}_${option.name}_name`]) error.push({err: "character in uppercase", cmd: object.name, langue: la.languageCode, opt: option.name})
                    else if(!(/^[\w-]{1,32}$/gm).test(Des_Lan[`${object.name}_${option.name}_name`])) error.push({err: "name does not match regex", cmd: object.name, langue: la.languageCode, opt: option.name})
                    if(!Des_Lan[`${object.name}_${option.name}_description`]) error.push({cmd: object.name, err: "no description", langue: la.languageCode, opt: option.name})
                    else if(Des_Lan[`${object.name}_${option.name}_description`].length > 99) error.push({cmd: object.name, err: "description too long", langue: la.languageCode, taille: Des_Lan[`${object.name}_${option.name}_description`].length, opt: option.name})
                })
            }else{
                if(!option.description) error.push({cmd: object.name, err: "no description", opt: option.name})
                else if(option.description.length > 99) error.push({cmd: object.name, err: "description too long", taille: option.description.length, opt: option.name})
            }
            if(!option.type) error.push({opt: option.name, err: "no type", cmd: object.name})
            else if(typeof option.type !== "number") error.push({opt: option.name, err: "type invalid", cmd: object.name})
            else if(![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(option.type)) error.push({opt: option.name, err: "type invalid", cmd: object.name})
            if(String(option.required) === "undefined") error.push({opt: option.name, err: "pas de required", cmd: object.name})
            else if(typeof option.required !== "boolean") error.push({opt: option.name, err: "required invalid", cmd: object.name})
            if(option.choices){
                if(!Array.isArray(option.choices)) error.push({opt: option.name, err: "choices invalid", cmd: object.name})
                else if(option.choices.length > 25) error.push({opt: option.name, err: "trop de choix", taille: option.choices.length, cmd: object.name})
                if(option.type !== 3 && option.choices.length !== 0) error.push({opt: option.name, err: "type not compatible with option", cmd: object.name})
            }
        }
    })

    if(object.options){
        let firstNotRequiredOption = object.options.find(option => !option.required)
        let firstRequiredOption = [...object.options].reverse().find(option => option.required)
        if(firstNotRequiredOption && firstRequiredOption){
            let indexFirstNotRequired = object.options.indexOf(firstNotRequiredOption)
            let indexFirstRequired = object.options.indexOf(firstRequiredOption)
            if(indexFirstRequired > indexFirstNotRequired) error.push({err: "Required options must be placed before not required options", cmd: object.name})
        }
    }

    return {type: "option", errors: error.length === 0 ? null : error, status: error.length === 0 ? true : false}
}

function checkChoices(object, state, languages){
    let error = []
    object.options.filter(opi => opi.choices && opi.choices.length !== 0).forEach(option => {
        option.choices.forEach(choice => {
            if(!choice.name || choice.name.length === 0) error.push({opt: option.name, err: "no choice name", cmd: object.name})
            else{
                if(choice.name.length > 100) error.push({opt: option.name, err: "name choice too long", taille: choice.name.length, cho: choice.name, cmd: object.name})
                if(!(/^[\w-]{1,32}$/gm).test(choice.name)) error.push({opt: option.name, err: "name does not match regex", taille: choice.name.length, cho: choice.name, cmd: object.name})
                if(state){
                    languages.forEach(la => {
                        const Des_Lan = la["choices"]
                        if(!Des_Lan[`${object.name}_${option.name}_${choice.name}_name`]) error.push({err: "no name", opt: option.name, cmd: object.name, langue: la.languageCode, choice: choice.name})
                        else if(Des_Lan[`${object.name}_${option.name}_${choice.name}_name`].length > 32) error.push({err: "name too long", opt: option.name, cmd: object.name, langue: la.languageCode, choice: choice.name, taille: Des_Lan[`${object.name}_${option.name}_${choice.name}_name`].length})
                        else if(!(/^[\w-]{1,32}$/gm).test(Des_Lan[`${object.name}_${option.name}_${choice.name}_name`])) error.push({err: "name does not match regex", opt: option.name, cmd: object.name, choice: choice.name, langue: la.languageCode})
                        else if(Des_Lan[`${object.name}_${option.name}_${choice.name}_name`].toLowerCase() !== Des_Lan[`${object.name}_${option.name}_${choice.name}_name`]) error.push({err: "character in uppercase", opt: option.name, cmd: object.name, langue: la.languageCode, choice: choice.name})
                    })
                }else{
                    
                }
                if(!choice.value) error.push({opt: option.name, err: "no choice value", cho: choice.name, cmd: object.name})
                else if(option.type === 3 && choice.value.length > 100) error.push({opt: option.name, err: "choice value too long", cho: choice.name, taille: choice.value.length, cmd: object.name})
            }
        })
    })
    return {type: "choice", errors: error.length === 0 ? null : error, status: error.length === 0 ? true : false}
}


module.exports.gets = {
    getBadges,
    getBietfielfFromPermissions,
    getIntentsFromNames,
    getPermissionsFromBitfields,
    getApplicationFlags,
    getApplicationMetadataType,
    getIntents,
}

module.exports.checks = {
    checkColor,
    checkComponents,
    checkContent,
    checkEmbed,
    checkFiles,
    checkId,
    checkOverwrites,
    checkReference,
    checkStickers,
    checkApplicationCommand,
    checkCommands,
    checkOptions,
    checkChoices,
    checkPoll
}

module.exports.general = {
    channelBackup,
    createError,
    revertTypes,
    presence,
    correctMessageData
}