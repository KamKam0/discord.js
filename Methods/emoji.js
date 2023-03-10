const verify = require("../Utils/verify")

/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {string} name 
 * @param {buffer} imagedata 
 * @param {object[]} roles 
 * @param {object} bot 
 * @returns 
 */
module.exports.create = async (token, guildid, name, imagedata, roles, bot) => {//cp
    return new Promise(async (resolve, reject) => {
        const createError = require("../Utils/functions").createError
        if(!token) return reject(createError("An error happened", {code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Emoji"}))
        if(!guildid) return reject(createError("An error happened", {code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Emoji"}))
        if(!require("../Utils/functions").check_id(guildid)) return reject(createError("An error happened", {code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Emoji"}))
        if(!name) return reject(createError("An error happened", {code: require("../DB/errors.json")["19"].code, message: require("../DB/errors.json")["19"].message, file: "Emoji"}))
        if(!imagedata) return reject(createError("An error happened", {code: require("../DB/errors.json")["20"].code, message: require("../DB/errors.json")["20"].message, file: "Emoji"}))
        if(!roles) return reject(createError("An error happened", {code: require("../DB/errors.json")["21"].code, message: require("../DB/errors.json")["21"].message, file: "Emoji"}))
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const FormData = require("form-data")
        body = new FormData()
        body.append(`files[0]`, imagedata.buffer, `${imagedata.name}.${imagedata.extension}`);
        let vody = {name: name, roles: roles}
        body.append("payload_json", JSON.stringify(vody))
        let headers = require("../Utils/functions").getbaseinfosrecp(token).baseheaders
        headers["Content-Type"] += body.getBoundary()
        const url = `${baseurl}/guilds/${guildid}/emojis`
        const basedatas = await fetch(url, {method: "POST", headers: headers, body: body}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.create(token, guildid, name, imagedata, roles)
                    .catch(err => reject(createError("An error happened", err)))
                    .then(datas => resolve(datas))
                }, datas.retry_after * 1000)
            }else return reject(createError("Une erreur s'est produite lors de la requ??te", datas))
        }
        else return resolve(new (require("../Gestionnaires/Individual/Emoji")({...datas, guild_id: guildid, token: token}, bot)))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {string} emojiid 
 * @param {object} bot 
 * @returns 
 */
module.exports.delete = async (token, guildid, emojiid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: emojiid, value_data: "id", data_name: "emojiid", order:3}, {value: bot, data_name: "bot", order: 4}], "DELETE", `guilds/${guildid}/emojis/${emojiid}`, this.delete, "delete emoji")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {string} emojiid 
 * @param {object} options 
 * @param {string} options.name
 * @param {object} bot 
 * @returns 
 */
module.exports.modify = async (token, guildid, emojiid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: emojiid, value_data: "id", data_name: "emojiid", order:3}, {value: options, data_name: "options", order:4}, {value: bot, data_name: "bot", order: 5}], "PATCH", `guilds/${guildid}/emojis/${emojiid}`, this.delete, "delete emoji")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}