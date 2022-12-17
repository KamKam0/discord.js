module.exports.create = (token, guildid, options) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Events"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Events"})
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Events"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Events"})

        const url = `${baseurl}/guilds/${guildid}/scheduled-events`
        const basedatas = await fetch(url, {headers: baseheaders, method: "POST", body: JSON.stringify(options)}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.create(token, guildid, options)
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
        else return resolve(new (require("../Gestionnaires/Individual/Event"))({...datas, guild_id: guildid, token: token}))
    })
}
module.exports.modify = (token, guildid, eventid, options) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Events"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Events"})
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Events"})
        if(!eventid) return reject({code: require("../DB/errors.json")["11"].code, message: require("../DB/errors.json")["11"].message, file: "Events"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Events"})
        if(!require("../Utils/functions").check_id(eventid)) return reject({code: require("../DB/errors.json")["65"].code, message: require("../DB/errors.json")["65"].message, file: "Events"})

        const url = `${baseurl}/guilds/${guildid}/scheduled-events/${eventid}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "PATCH"}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.modify(token, guildid, eventid, options)
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
        else return resolve(new (require("../Gestionnaires/Individual/Event"))({...datas, guild_id: guildid, token: token}))
    })
}
module.exports.delete = (token, guildid, eventid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Events"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Events"})
        if(!eventid) return reject({code: require("../DB/errors.json")["11"].code, message: require("../DB/errors.json")["11"].message, file: "Events"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Events"})
        if(!require("../Utils/functions").check_id(eventid)) return reject({code: require("../DB/errors.json")["65"].code, message: require("../DB/errors.json")["65"].message, file: "Events"})
        const url = `${baseurl}/guilds/${guildid}/scheduled-events/${eventid}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "DELETE"}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.delete(token, guildid, eventid)
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