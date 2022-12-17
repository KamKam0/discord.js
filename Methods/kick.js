module.exports = async (token, guildid, memberid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Kick"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Kick"})
        if(!memberid) return reject({code: require("../DB/errors.json")["4"].code, message: require("../DB/errors.json")["4"].message, file: "Kick"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Kick"})
        if(!require("../Utils/functions").check_id(memberid)) return reject({code: require("../DB/errors.json")["56"].code, message: require("../DB/errors.json")["56"].message, file: "Kick"})
        const url = `${baseurl}/guilds/${guildid}/members/${memberid}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "DELETE"}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this(token, guildid, memberid)
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