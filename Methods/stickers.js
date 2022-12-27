module.exports.create = async (token, guildid, name, file, tags, description) => {//Cp
    return new Promise(async (resolve, reject) => {
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Stickers"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Stickers"})
        if(!name) return reject({code: require("../DB/errors.json")["19"].code, message: require("../DB/errors.json")["19"].message, file: "Stickers"})
        if(!file) return reject({code: require("../DB/errors.json")["27"].code, message: require("../DB/errors.json")["27"].message, file: "Stickers"})
        if(!tags) return reject({code: require("../DB/errors.json")["28"].code, message: require("../DB/errors.json")["28"].message, file: "Stickers"})
        if(!description) return reject({code: require("../DB/errors.json")["29"].code, message: require("../DB/errors.json")["29"].message, file: "Stickers"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Stickers"})
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
        else return resolve(new (require("../Gestionnaires/Individual/Sticker"))({...datas, token: token, guild_id: guildid}))
    })
}
module.exports.delete = async (token, guildid, stickerid) => {
    return new Promise(async (resolve, reject) => {
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Stickers"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Stickers"})
        if(!stickerid) return reject({code: require("../DB/errors.json")["9"].code, message: require("../DB/errors.json")["9"].message, file: "Stickers"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Stickers"})
        if(!require("../Utils/functions").check_id(stickerid)) return reject({code: require("../DB/errors.json")["71"].code, message: require("../DB/errors.json")["71"].message, file: "Stickers"})
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        const url = `${baseurl}/guilds/${guildid}/stickers/${stickerid}`
        const basedatas = await fetch(url, {method: "DELETE", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.delete(token, guildid, stickerid)
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
    })
}
module.exports.modify = async (token, guildid, stickerid, options) => {
    return new Promise(async (resolve, reject) => {
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Stickers"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Stickers"})
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Stickers"})
        if(!stickerid) return reject({code: require("../DB/errors.json")["9"].code, message: require("../DB/errors.json")["9"].message, file: "Stickers"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Stickers"})
        if(!require("../Utils/functions").check_id(stickerid)) return reject({code: require("../DB/errors.json")["71"].code, message: require("../DB/errors.json")["71"].message, file: "Stickers"})

        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        const url = `${baseurl}/guilds/${guildid}/stickers/${stickerid}`
        const basedatas = await fetch(url, {method: "PATCH", headers: baseheaders, body: JSON.stringify(options)}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.modify(token, guildid, stickerid, options)
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
        else return resolve(new (require("../Gestionnaires/Individual/Sticker"))({...datas, token: token, guild_id: guildid}))
    })
}