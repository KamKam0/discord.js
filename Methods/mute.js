module.exports.mute = async (token, guildid, memberid, time, bot) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Mute"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Mute"})
        if(!memberid) return reject({code: require("../DB/errors.json")["4"].code, message: require("../DB/errors.json")["4"].message, file: "Mute"})
        if(!time) return reject({code: require("../DB/errors.json")["26"].code, message: require("../DB/errors.json")["26"].message, file: "Mute"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Mute"})
        if(!require("../Utils/functions").check_id(memberid)) return reject({code: require("../DB/errors.json")["56"].code, message: require("../DB/errors.json")["56"].message, file: "Mute"})
        const url = `${baseurl}/guilds/${guildid}/members/${memberid}`
        time = new Date(Date.now() + require("@kamkam1_0/ms")(time)).toISOString()
        const basedatas = await fetch(url, {headers: baseheaders, method: "PATCH", body: JSON.stringify({communication_disabled_until: time})}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.mute(token, guildid, memberid, time)
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
        else return resolve(new (require("../Gestionnaires/Individual/Member"))({...datas, token: token, guild_id: guildid}, bot))
    })
}
module.exports.unmute = async (token, guildid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Mute"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Mute"})
        if(!memberid) return reject({code: require("../DB/errors.json")["4"].code, message: require("../DB/errors.json")["4"].message, file: "Mute"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Mute"})
        if(!require("../Utils/functions").check_id(memberid)) return reject({code: require("../DB/errors.json")["56"].code, message: require("../DB/errors.json")["56"].message, file: "Mute"})
        const url = `${baseurl}/guilds/${guildid}/members/${memberid}`
        time = new Date(Date.now() + require("@kamkam1_0/ms")(time)).toISOString()
        const basedatas = await fetch(url, {headers: baseheaders, method: "PATCH", body: JSON.stringify({communication_disabled_until: null})}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.unmute(token, guildid, memberid)
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
        else return resolve(new (require("../Gestionnaires/Individual/Member"))({...datas, token: token, guild_id: guildid}, bot))
    })
}