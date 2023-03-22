const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/emoji")

module.exports.create = async (token, guildid, name, imagedata, roles, bot) => {//cp
    return new Promise(async (resolve, reject) => {
        const createError = require("../utils/functions").createError
        if(!token) return reject(createError("An error happened", {code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Emoji"}))
        if(!guildid) return reject(createError("An error happened", {code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Emoji"}))
        if(!require("../utils/functions").check_id(guildid)) return reject(createError("An error happened", {code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Emoji"}))
        if(!name) return reject(createError("An error happened", {code: require("../DB/errors.json")["19"].code, message: require("../DB/errors.json")["19"].message, file: "Emoji"}))
        if(!imagedata) return reject(createError("An error happened", {code: require("../DB/errors.json")["20"].code, message: require("../DB/errors.json")["20"].message, file: "Emoji"}))
        if(!roles) return reject(createError("An error happened", {code: require("../DB/errors.json")["21"].code, message: require("../DB/errors.json")["21"].message, file: "Emoji"}))
        const fetch = require("node-fetch")
        let baseinfos = require("../utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const FormData = require("form-data")
        body = new FormData()
        body.append(`files[0]`, imagedata.buffer, `${imagedata.name}.${imagedata.extension}`);
        let vody = {name: name, roles: roles}
        body.append("payload_json", JSON.stringify(vody))
        let headers = require("../utils/functions").getbaseinfosrecp(token).baseheaders
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
            }else return reject(createError("Une erreur s'est produite lors de la requête", datas))
        }
        else return resolve(new (require("../Gestionnaires/Individual/Emoji")({...datas, guild_id: guildid, token: token}, bot)))
    })
}

module.exports.delete = async (informations) => {
    let passedOptions = {
        method: apiPath.delete.method,
        token: informations.botToken,
        url: apiPath.delete.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null, null)
}

module.exports.modify = async (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.method,
        token: informations.botToken,
        url: apiPath.modify.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/emoji")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess, null)
}