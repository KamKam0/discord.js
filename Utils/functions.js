const constants = require("../constants")

/**
 * 
 * @param {*} token 
 * @returns 
 */
function getbaseinfosre(token){
    const baseurl = GetApiURL()
    const baseheaders = GetHeaders(token, "basic")
    return {baseurl, baseheaders}
}

/**
 * 
 * @param {string} token 
 * @returns 
 */
function getbaseinfosrecp(token){
    const baseurl = GetApiURL()
    const baseheaders = GetHeaders(token, "file")
    return {baseurl, baseheaders}
}

/**
 * 
 * @param {string} token 
 * @returns 
 */
function getbaseinfosre_xww(token){
    const baseurl = GetApiURL()
    const baseheaders = GetHeaders(token, "url")
    return {baseurl, baseheaders}
}

/**
 * 
 * @param {string} token 
 * @param {string} type 
 * @returns 
 */
function GetHeaders(token, type){
    const version = require("../index").version
    switch(type){
        case("url"):
            return {
                Authorization: `Bot ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
                'User-Agent': `DiscordBot (Darkness Group - No URL, ${version})`
            }
        break;
        case("file"):
            return {
                Authorization: `Bot ${token}`,
                "Content-Type": "multipart/form-data; boundary=",
                'User-Agent': `DiscordBot (Darkness Group - No URL, ${version})`
            }
        break;
        case("basic"):
            return {
                Authorization: `Bot ${token}`,
                "Content-Type": "application/json",
                'User-Agent': `DiscordBot (Darkness Group - No URL, ${version})`
            }
        break;
        default:
            return "Error"
        break;
    }
}

function GetApiURL(){
    return "https://discord.com/api/v10"
}

/**
 * 
 * @param {object[]} permissions 
 * @returns 
 */
function get_bitfield(permissions){//totest
    if(!Array.isArray(permissions)) return null
    if(!permissions[0]) return 0
    return permissions.map(perm => String(perm).toUpperCase()).reduce((a, b) => constants.permissions_bitfield[b] ? a+constants.permissions_bitfield[b] : a+0, 0)
}

/**
 * 
 * @param {object[]} intents 
 * @returns 
 */
function get_intents_n(intents){//totest
    if(!Array.isArray(intents) && typeof intents !== "string" && intents !== "ALL") return "Incorrect Intents"
    if(intents === "ALL") return Object.values(constants.Intents).reduce((a, b) => a+b, 0)
    return intents.reduce((a, b) => constants.Intents[b] ? a + constants.Intents[b] : a+0, 0)
}

/**
 * 
 * @param {number} bitfield 
 * @returns 
 */
function get_badges(bitfield){//totest
    if(!bitfield) return "Incorrect number"
    const ACFlags = Object.entries(constants.badges).sort((a, b) => Number(b[1]) - Number(a[1]))
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

/**
 * 
 * @param {string} color 
 * @returns 
 */
function check_color(color){
    let check = String(color).match(/^#([a-f0-9]{6}|[a-f0-9]{3})\b$/i)
    if(String(check) !== "null") return true
    else return false
}

/**
 * 
 * @param {number} bitfield 
 * @returns 
 */
function bietfieldpermission(bitfield){//totest
    const ACFlags = Object.entries(constants.permissions_bitfield).sort((a, b) => Number(b[1]) - Number(a[1]))
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

/**
 * 
 * @param {string} Id 
 * @returns 
 */
function check_id(Id){//totest
    if(isNaN(Id) || typeof Id !== "string" || Id.length > 22 || Id.length < 15) return false
    return true
}

/**
 * 
 * @param {object} overwrites 
 * @returns 
 */
function check_overwrites(overwrites){
    if(!Array.isArray(overwrites)) return false
    if(overwrites.length === 0) return false
    let result_final;
    overwrites.forEach(overwrite => {
        if(result_final !== false){
            if(typeof overwrite !== "object") result_final = false
            else if(!overwrite.id || !overwrite.type || !overwrite.allow || !overwrite.deny) result_final = false
            else if(!check_id(overwrite.id)) result_final = false
            else if(typeof overwrite.type !== "number") result_final = false
            else if(typeof overwrite.allow !== "string" || isNaN(overwrite.allow)) result_final = false
            else if(typeof overwrite.deny !== "string" || isNaN(overwrite.deny)) result_final = false
            else result_final = true
        }
    })
    return result_final
}

/**
 * 
 * @param {object} presence 
 * @returns 
 */
function presence(presence){
    if(presence && typeof presence === "object"){
        let since = null
        if(presence.since && typeof presence.since === "number") since = Number(presence.since)
        else since = Date.now()
        if(presence.status && typeof presence.status === "string" && (/(online|offline|dnd|idle|invisible)/gm).test(presence.status)){
            if(presence.status === "offline" || presence.status === "invisible"){
                presence.activities = undefined
                since = null
            }
            if(presence.activities && Array.isArray(presence.activities)){
                let def_act = []
                presence.activities.forEach(act => {
                    if(typeof act === "object" && act.name && typeof act.name === "string" && act.type){
                        if(act.name.length < 200){
                            if((/(playing|streaming|competing|listening|watching|custom)/gm).test(act.type)){
                                const convert = {
                                    playing: 0,
                                    streaming: 1,
                                    listening: 2,
                                    watching: 3,
                                    custom: 4,
                                    competing: 5
                                }
                                act.type = convert[act.type]
                                if(act.type === 4){
                                    if(act.name.split(":").length >= 2) def_act.push({name: act.name, type: act.type})
                                }else def_act.push({name: act.name, type: act.type})
                            }
                        }
                    }
                })
                return {activities: def_act, afk: false, status: presence.status, since: since}
            }else return {activities: [], afk: false, status: presence.status, since: since}
        }else{
            if(presence.activities && Array.isArray(presence.activities)){
                let def_act = []
                presence.activities.forEach(act => {
                    if(typeof act === "object" && act.name && typeof act.name === "string" && act.type){
                        if(act.name.length < 200){
                            if((/(playing|streaming|competing|listening|watching|custom)/gm).test(act.type)){
                                const convert = {
                                    playing: 0,
                                    streaming: 1,
                                    listening: 2,
                                    watching: 3,
                                    custom: 4,
                                    competing: 5
                                }
                                act.type = convert[act.type]
                                if(act.type === 4){
                                    if(act.name.split(":").length >= 2) def_act.push({name: act.name, type: act.type})
                                }else def_act.push({name: act.name, type: act.type})
                            }
                        }
                    }
                })
                return {activities: def_act, afk: false, status: "online", since: since}
            }else return {activities: [], afk: false, status: "online", since: since}
        }
    }else return {activities: [], afk: false, status: "online", since: Date.now()}
}

/**
 * 
 * @param {string} id 
 * @param {string} token 
 * @param {object} bot 
 * @returns 
 */
function channel_backup(id, token, bot){
    let channel = {
        id,
        type: 1,
        token
    }

    return new (require("../Gestionnaires/Individual/Channels_/Channel_1"))(channel, bot)
}

function check_options(structure, options){
    let error = {count: 0, state: true}
    return error
    /*if(typeof options !== "object"){
        error.count++
        error[`error_${error.count}`] = "Invalid type of options"
        error.state = false
        return error
    }
    let object_s = Object.entries(structure)
    let object_o = Object.entries(options)
    object_s.forEach(obs => {
        if(!object_o.find(obe => obe[0] === obs[0])){
            error.count++
            error[`error_${error.count}`] = `${obs[0]} not found in options`
        }else if((typeof object_o.find(obe => obe[0] === obs[0])[1] !== obs[1]) && (Array.isArray(object_o.find(obe => obe[0] === obs[0])[1]) !== obs[1])){
            error.count++
            error[`error_${error.count}`] = `${obs[0]}, should be type: ${obs[1]}`
        }
    })
    if(error.count === 0) return error
    else{
        error.state = false
        return error
    }*/
}

/**
 * 
 * @param {object} options 
 * @returns 
 */

function analyse_data(options){
    if(!options) return null
    if(options && options.modal) return options
    if(typeof options !== "object" && typeof options === "string") return {content: options}
    else if(typeof options === "object" && (options.description || options.title || options.fields)) return {embeds: [options]}
    else if(typeof options === "object" && (options.name || options.buffer || options.extension)) return {files: [options]}
    else if(typeof options === "object" && options.type) return {components: [options]}
    else if(typeof options === "object" && (options.content || options.embeds || options.files || options.modal || options.components || options.sticker_ids)) return options
    else return null
}

/**
 * 
 * @param {object[]} embeds 
 * @returns 
 */
function check_embed(embeds){
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

/**
 * 
 * @param {string} content 
 * @returns 
 */
function check_content(content){
    if(!content) return null
    if(typeof content !== "string") return null
    if(content.length < 1 || content.length > 2000) return null
    return content
}

/**
 * 
 * @param {object[]} stickers 
 * @returns 
 */
function check_stickers(stickers){
    if(!stickers) return []
    if(!Array.isArray(stickers)) return []
    return stickers
}

/**
 * 
 * @param {object[]} components 
 * @returns 
 */
function check_components(components){
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

/**
 * 
 * @param {object[]} files 
 * @returns 
 */
function check_files(files){
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

/**
 * 
 * @param {object} reference 
 * @returns 
 */
function check_reference(reference){
    if(typeof reference !== "object") return null
    if(!reference.channel_id || !reference.message_id) return null
    if(!require("../Utils/functions").check_id(reference.channel_id)) return null
    if(!require("../Utils/functions").check_id(reference.message_id)) return null
    if(String(reference.fail_if_not_exist) === "undefined") reference.fail_if_not_exist = false
    return reference
}

module.exports = {getbaseinfosre, getbaseinfosrecp, getbaseinfosre_xww, GetHeaders, GetApiURL, get_bitfield, get_intents_n, get_badges, check_color, check_id, check_overwrites, bietfieldpermission, presence, channel_backup, check_options, check_reference, check_files, check_components, check_stickers, check_content, check_embed, analyse_data}
module.exports.constants = constants