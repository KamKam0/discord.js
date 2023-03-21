const constants = require("./constants")
const intentsConstance = require("../types/intents")
const userBadges = require("../types/userbadges")

function getBietfielfFromPermissions(permissions){
    if(!Array.isArray(permissions)) return null
    if(!permissions[0]) return 0
    return permissions.map(perm => String(perm).toUpperCase()).reduce((a, b) => constants.permissionsBitfield[b] ? a+constants.permissionsBitfield[b] : a+0, 0)
}

function getIntentsFromNames(intents){
    if(!Array.isArray(intents) && typeof intents !== "string" && intents !== "ALL") return "Incorrect Intents"
    if(intents === "ALL") return Object.values(intentsConstance).reduce((a, b) => a+b, 0)
    return intents.reduce((a, b) => intents[b] ? a + intents[b] : a+0, 0)
}

function getBadges(bitfield){
    if(!bitfield) return "Incorrect number"
    const ACFlags = Object.entries(userBadges).sort((a, b) => Number(b[1]) - Number(a[1]))
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

function checkColor(color){
    let check = String(color).match(/^#([a-f0-9]{6}|[a-f0-9]{3})\b$/i)
    if(String(check) !== "null") return true
    else return false
}

function getPermissionsFromBitfields(bitfield){
    const ACFlags = Object.entries(constants.permissionsBitfield).sort((a, b) => Number(b[1]) - Number(a[1]))
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
        type: 1,
        token: bot.discordjs.token
    }
    const channelClass = require("../structures/singles/channels/channeldm")
    return new channelClass(channel, bot)
}

function correctMessageData(options){
    if(!options) return null
    if(options && options.modal) return options
    if(typeof options !== "object" && typeof options === "string") return {content: options}
    else if(typeof options === "object" && (options.description || options.title || options.fields)) return {embeds: [options]}
    else if(typeof options === "object" && (options.name || options.buffer || options.extension)) return {files: [options]}
    else if(typeof options === "object" && options.type) return {components: [options]}
    else if(typeof options === "object" && (options.content || options.embeds || options.files || options.modal || options.components || options.sticker_ids)) return options
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
        if(typeof activity === "object" && typeof activity.name === "string" && activity.name.length < 200 && ["string", "number"].includes(typeof activity.type) && (convert[activity.type] || Object.values(convert).includes(activity.type))) return {type: convert[activity.type] || activity.type, name: activity.name} }) 
    else presence.activities = []
    base.activities = presence.activities
    return base
}

function checkEmbed(embeds){
    if(!embeds) return []
    if(!Array.isArray(embeds)){
        if(typeof embeds === "object" && (embeds.description || embeds.title || embeds.fields)) embeds = [embeds]
        else return []
    }
    let trueembeds = []
    embeds.forEach(emb => {
        if(emb.footer && !emb.footer.text) return
        if(emb.author && !emb.author.name) return
        if(!emb.color || typeof emb.color !== "number") emb.color = 0x000000
        if(emb.fields) emb.fields = emb.fields.map(field => {
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
        if(!file.name || typeof file.name !== "string" || file.name.length > 200) return
        if(!file.buffer || !Buffer.isBuffer(file.buffer)) return
        if(!file.extension || typeof file.extension !== "string" || file.extension.length > 8) return
        truefiles.push(file)
    })
    return truefiles
}

function checkReference(reference){
    if(typeof reference !== "object") return null
    if(!reference.channel_id || !reference.message_id) return null
    if(!require("../Utils/functions").check_id(reference.channel_id)) return null
    if(!require("../Utils/functions").check_id(reference.message_id)) return null
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


module.exports.gets = {
    getBadges,
    getBietfielfFromPermissions,
    getIntentsFromNames,
    getPermissionsFromBitfields,
    getComputedStyle,
    getSelection
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
    checkStickers
}

module.exports.general = {
    channelBackup,
    createError,
    revertTypes,
    presence,
    correctMessageData
}