const verify = require("../Utils/verify")
const createError = require("../Utils/functions").createError

/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {string} name 
 * @param {buffer} file 
 * @param {object[]} tags 
 * @param {string} description 
 * @param {object} bot 
 * @returns 
 */
module.exports.create = async (token, guildid, name, file, tags, description, bot) => {//Cp
    return new Promise(async (resolve, reject) => {
        if(!token) return reject(createError("An error happened", {code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Stickers"}))
        if(!guildid) return reject(createError("An error happened", {code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Stickers"}))
        if(!name) return reject(createError("An error happened", {code: require("../DB/errors.json")["19"].code, message: require("../DB/errors.json")["19"].message, file: "Stickers"}))
        if(!file) return reject(createError("An error happened", {code: require("../DB/errors.json")["27"].code, message: require("../DB/errors.json")["27"].message, file: "Stickers"}))
        if(!tags) return reject(createError("An error happened", {code: require("../DB/errors.json")["28"].code, message: require("../DB/errors.json")["28"].message, file: "Stickers"}))
        if(!description) return reject(createError("An error happened", {code: require("../DB/errors.json")["29"].code, message: require("../DB/errors.json")["29"].message, file: "Stickers"}))
        if(!require("../Utils/functions").check_id(guildid)) return reject(createError("An error happened", {code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Stickers"}))
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const FormData = require("form-data")
        body = new FormData()
        body.append(`files[0]`, file.buffer, `${file.name}.${file.extension}`);
        let vody = {name: name, tags: tags, description: description}
        body.append("payload_json", JSON.stringify(vody))
        let headers = require("../Utils/functions").getbaseinfosrecp(token).baseheaders
        headers["Content-Type"] += body.getBoundary()
        const url = `${baseurl}/guilds/${guildid}/stickers`
        const basedatas = await fetch(url, {method: "POST", headers: headers, body: body})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.create(token, guildid, name, file, tags, description)
                    .catch(err => reject(createError("An error happened", err)))
                    .then(datas => resolve(datas))
                }, datas.retry_after * 1000)
            }else return reject(createError("Une erreur s'est produite lors de la requ??te", datas))
        }
        else return resolve(new (require("../Gestionnaires/Individual/Sticker"))({...datas, token: token, guild_id: guildid}, bot))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {string} stickerid 
 * @param {object} bot 
 * @returns 
 */
module.exports.delete = async (token, guildid, stickerid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: stickerid, value_data: "id", data_name: "stickerid", order:3}, {value: bot, data_name: "bot", order: 4}], "DELETE", `guilds/${guildid}/stickers/${stickerid}`, this.delete, "delete sticker")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {string} stickerid 
 * @param {object} options 
 * @param {object} bot 
 * @returns 
 */
module.exports.modify = async (token, guildid, stickerid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: stickerid, value_data: "id", data_name: "stickerid", order:3}, {value: options, data_name: "options", order: 4}, {value: bot, data_name: "bot", order: 5}], "PATCH", `guilds/${guildid}/stickers/${stickerid}`, this.modify, "modify sticker")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}