module.exports.adduser = (token, channelid, userid, nick, accesstoken) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "DM"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "DM"})
        if(!userid) return reject({code: require("../DB/errors.json")["17"].code, message: require("../DB/errors.json")["17"].message, file: "DM"})
        if(!nick) return reject({code: require("../DB/errors.json")["18"].code, message: require("../DB/errors.json")["18"].message, file: "DM"})
        if(!accesstoken) return reject({code: require("../DB/errors.json")["17"].code, message: require("../DB/errors.json")["17"].message, file: "DM"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "DM"})
        if(!require("../Utils/functions").check_id(userid)) return reject({code: require("../DB/errors.json")["47"].code, message: require("../DB/errors.json")["49"].message, file: "DM"})
        if(typeof nick !== "string") return reject({code: require("../DB/errors.json")["62"].code, message: require("../DB/errors.json")["62"].message, file: "DM"})
        if(typeof accesstoken !== "string") return reject({code: require("../DB/errors.json")["63"].code, message: require("../DB/errors.json")["63"].message, file: "DM"})
        const url = `${baseurl}/channels/${channelid}/recipients/${userid}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "PUT", body: JSON.stringify({access_token: accesstoken, nick: nick})}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.adduser(token, channelid, userid, nick, accesstoken)
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
module.exports.removeuser = (token, channelid, userid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "DM"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "DM"})
        if(!userid) return reject({code: require("../DB/errors.json")["7"].code, message: require("../DB/errors.json")["7"].message, file: "DM"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "DM"})
        if(!require("../Utils/functions").check_id(userid)) return reject({code: require("../DB/errors.json")["47"].code, message: require("../DB/errors.json")["49"].message, file: "DM"})
        const url = `${baseurl}/channels/${channelid}/recipients/${userid}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "DELETE"}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.removeuser(token, channelid, userid)
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