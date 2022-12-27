const verify = require("../Utils/verify")
module.exports.create = async (token, guildid, name, imagedata, roles) => {//cp
    return new Promise(async (resolve, reject) => {
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Emoji"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Emoji"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Emoji"})
        if(!name) return reject({code: require("../DB/errors.json")["19"].code, message: require("../DB/errors.json")["19"].message, file: "Emoji"})
        if(!imagedata) return reject({code: require("../DB/errors.json")["20"].code, message: require("../DB/errors.json")["20"].message, file: "Emoji"})
        if(!roles) return reject({code: require("../DB/errors.json")["21"].code, message: require("../DB/errors.json")["21"].message, file: "Emoji"})
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
                    .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête")
                    er.content = err
                    reject(er)
                })
                    .then(datas => { return resolve(datas)})
                }, datas.retry_after * 1000)
            }else{
                    let er = new Error("Une erreur s'est produite lors de la requête")
                    er.content = datas
                    return reject(er)
                }
        }
        else return resolve(new (require("../Gestionnaires/Individual/Emoji")({...datas, guild_id: guildid, token: token})))
    })
}
module.exports.delete = async (token, guildid, emojiid) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: guildid, value_data: "id", type: "string", data_name: "guildid"}, {value: emojiid, value_data: "id", type: "string", data_name: "emojiid"}], "DELETE", `guilds/${guildid}/emojis/${emojiid}`, this.delete, "delete emoji")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.modify = async (token, guildid, emojiid, options) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: guildid, value_data: "id", type: "string", data_name: "guildid"}, {value: emojiid, value_data: "id", type: "string", data_name: "emojiid"}, {value: options, type: "object", data_name: "options"}], "PATCH", `guilds/${guildid}/emojis/${emojiid}`, this.delete, "delete emoji")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}