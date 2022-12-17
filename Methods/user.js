
module.exports.createDM = async (token, user) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "User"})
        if(!user) return reject({code: require("../DB/errors.json")["7"].code, message: require("../DB/errors.json")["7"].message, file: "User"})
        if(!require("../Utils/functions").check_id(user)) return reject({code: require("../DB/errors.json")["47"].code, message: require("../DB/errors.json")["47"].message, file: "User"})
        const url = `${baseurl}/users/@me/channels`
        const basedatas = await fetch(url, {method: "POST", headers: baseheaders, body: JSON.stringify({recipient_id: user})}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.createDM(token, user)
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
        else return resolve(new (require("../Gestionnaires/Individual/Channels_/Channel_1"))({...datas, token: token}))
    })
}
module.exports.createGroup = async (token, accesses, nicks) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "User"})
        if(!accesses) return reject({code: require("../DB/errors.json")["32"].code, message: require("../DB/errors.json")["32"].message, file: "User"})
        if(!nicks) return reject({code: require("../DB/errors.json")["33"].code, message: require("../DB/errors.json")["33"].message, file: "User"})
        const url = `${baseurl}/users/@me/channels`
        const basedatas = await fetch(url, {method: "POST", headers: baseheaders, body: JSON.stringify({access_tokens: accesses, nicks: nicks})}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.createGroup(token, accesses, nicks)
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
        else return resolve(new (require("../Gestionnaires/Individual/Channels_/Channel_1"))({...datas, token: token}))
    })
}
module.exports.send = async (bot, userid, options) => {
    return new Promise(async (resolve, reject) => {
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "User"})
        if(!user) return reject({code: require("../DB/errors.json")["7"].code, message: require("../DB/errors.json")["7"].message, file: "User"})
        if(!bot) return reject({code: require("../DB/errors.json")["34"].code, message: require("../DB/errors.json")["34"].message, file: "User"})
        
        this.createDM(bot, userid)
        .catch(err => {
            let er = new Error("Une erreur s'est produite lors de la requête")
            er.content = err
            reject(er)
        })
        .then(channel => {
        
            require("./message").send(bot, channel.id, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête")
                er.content = err
                reject(er)
            })
            .then(message => {
                return resolve(message)
            })
        })
        
    })
}