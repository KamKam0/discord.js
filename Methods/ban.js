module.exports.ban = async (token, guildid, memberid, reason) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Ban"})
        if(!memberid) return reject({code: require("../DB/errors.json")["4"].code, message: require("../DB/errors.json")["4"].message, file: "Ban"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Ban"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Ban"})
        if(!require("../Utils/functions").check_id(memberid)) return reject({code: require("../DB/errors.json")["56"].code, message: require("../DB/errors.json")["56"].message, file: "Ban"})
        if(reason && typeof reason !== "string") return reject({code: require("../DB/errors.json")["75"].code, message: require("../DB/errors.json")["75"].message, file: "Ban"})
        const url = `${baseurl}/guilds/${guildid}/bans/${memberid}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "PUT", body: JSON.stringify({delete_message_days: 0, reason: `${reason ? String(reason) : "No Reason Provided"}`})})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.ban(token, guildid, memberid, reason)
                    .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - ban 1, ban method")
                    er.content = err
                    reject(er)
                })
                    .then(datas => { return resolve(datas)})
                }, datas.retry_after * 1000)
            }else{
                    let er = new Error("Une erreur s'est produite lors de la requête - ban 2, ban method")
                    er.content = datas
                    return reject(er)
                }
        } 
    })
}

module.exports.unban = async (token, guildid, memberid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre_xww(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Ban"})
        if(!memberid) return reject({code: require("../DB/errors.json")["4"].code, message: require("../DB/errors.json")["4"].message, file: "Ban"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Ban"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Ban"})
        if(!require("../Utils/functions").check_id(memberid)) return reject({code: require("../DB/errors.json")["56"].code, message: require("../DB/errors.json")["56"].message, file: "Ban"})
        const url = `${baseurl}/guilds/${guildid}/bans/${memberid}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "DELETE"}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.unban(token, guildid, memberid)
                    .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - unban 1, ban method")
                    er.content = err
                    reject(er)
                })
                    .then(datas => { return resolve(datas)})
                }, datas.retry_after * 1000)
            }else{
                    let er = new Error("Une erreur s'est produite lors de la requête - unban 2, ban method")
                    er.content = datas
                    return reject(er)
                }
        } 
    })
}

module.exports.fetch = async (token, guildid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Ban"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Ban"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Ban"})
        const url = `${baseurl}/guilds/${guildid}/bans`
        const basedatas = await fetch(url, {headers: baseheaders, method: "GET"}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.fetch(token, guildid)
                    .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - fetch 1, ban method")
                    er.content = err
                    reject(er)
                })
                    .then(datas => { resolve(datas) })
                }, datas.retry_after * 1000)
            }else{
                    let er = new Error("Une erreur s'est produite lors de la requête - fetch 2, ban method")
                    er.content = datas
                    return reject(er)
                }
        }else{
            const Bans = new (require("../../Gestionnaires/Multiple/Bans"))(guildid)
            Bans.AddBans(datas.map(da => { return {...da, token: token}}))
            return resolve(Bans)
        }
    })
}

module.exports.fetchspe = async (token, guildid, memberid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Ban"})
        if(!memberid) return reject({code: require("../DB/errors.json")["4"].code, message: require("../DB/errors.json")["4"].message, file: "Ban"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Ban"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Ban"})
        if(!require("../Utils/functions").check_id(memberid)) return reject({code: require("../DB/errors.json")["56"].code, message: require("../DB/errors.json")["56"].message, file: "Ban"})
        const url = `${baseurl}/guilds/${guildid}/bans/${memberid}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "GET"}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.fetchspe(guildid, memberid)
                    .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - fetchspe 1, ban method")
                    er.content = err
                    reject(er)
                })
                    .then(datas => { return resolve(datas) })
                }, datas.retry_after * 1000)
            }else{
                    let er = new Error("Une erreur s'est produite lors de la requête - fetchspe 2, ban method")
                    er.content = datas
                    return reject(er)
                }
        }
        else{
            const Ban = new (require("../Gestionnaires/Individual/Ban"))({...datas, guild_id: guildid, token: token})
            return resolve(Ban)
        }
    })
}