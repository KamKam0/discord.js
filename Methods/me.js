module.exports.getuser = async (token) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Me"})
        const baseheaders = baseinfos["baseheaders"]
        const url = `${baseurl}/users/@me`
        const basedatas = await fetch(url, {headers: baseheaders, method: "GET"}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.getuser(token)
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
        else return resolve(new (require("../Gestionnaires/Individual/User"))({...datas, token: token}))
    })
}

module.exports.setstatus = (bot, options) => {
    if(!bot) return ({code: require("../DB/errors.json")["34"].code, message: require("../DB/errors.json")["34"].message, file: "Me"})
    if(!options) return ({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Me"})
    if(typeof options !== "string") return ({code: require("../DB/errors.json")["38"].code, message: require("../DB/errors.json")["38"].message, file: "Me"})
    if(bot.state !== "ready") return ({code: require("../DB/errors.json")["39"].code, message: require("../DB/errors.json")["39"].message, file: "Me"})


    let body = {
        op: 3,
        d: require("../Utils/functions").presence({since: bot.discordjs.lancement, activities: bot.presence.activities, status: options})
    }
    bot.discordjs.ws.send(JSON.stringify(body))
    return 'complete'
}

module.exports.setactivity = async (bot, options) => {
    if(!bot) return ({code: require("../DB/errors.json")["34"].code, message: require("../DB/errors.json")["34"].message, file: "Me"})
    if(!options) return ({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Me"})
    if(!Array.isArray(options)) return ({code: require("../DB/errors.json")["40"].code, message: require("../DB/errors.json")["40"].message, file: "Me"})
    if(bot.state !== "ready") return ({code: require("../DB/errors.json")["39"].code, message: require("../DB/errors.json")["39"].message, file: "Me"})
    if(!bot || !options || !Array.isArray(options)) return "incorrect infos"

    let body = {
        op: 3,
        d: require("../Utils/functions").presence({since: bot.discordjs.lancement, activities: options, status: bot.presence.status})
    }
    bot.discordjs.ws.send(JSON.stringify(body))
    return 'complete'
}

module.exports.setpresence = async (bot, options) => {
    if(!bot) return ({code: require("../DB/errors.json")["34"].code, message: require("../DB/errors.json")["34"].message, file: "Me"})
    if(!options) return ({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Me"})
    if(typeof options !== "object") return ({code: require("../DB/errors.json")["24"].code, message: require("../DB/errors.json")["24"].message, file: "Me"})
    if(bot.state !== "ready") return ({code: require("../DB/errors.json")["39"].code, message: require("../DB/errors.json")["39"].message, file: "Me"})
    if(!options.status) return ({code: require("../DB/errors.json")["41"].code, message: require("../DB/errors.json")["41"].message, file: "Me"})
    if(!options.activities) return ({code: require("../DB/errors.json")["42"].code, message: require("../DB/errors.json")["42"].message, file: "Me"})

    let body = {
        op: 3,
        d: require("../Utils/functions").presence({since: bot.discordjs.lancement, activities: options.activities, status: options.status})
    }
    console.log("set presence - me")
    console.log(require("../Utils/functions").presence({since: bot.discordjs.lancement, activities: options.activities, status: options.status}))
    console.log(new Date(Date.now()).toLocaleString())
    bot.discordjs.ws.send(JSON.stringify(body))
    return 'complete'
}
module.exports.leave = async (token, guildid) => {
    return new Promise(async (resolve, reject) => {
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Me"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Me"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Me"})
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        const url = `${baseurl}/users/@me/guilds/${guildid}`
        const basedatas = await fetch(url, {method: "DELETE", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.leave(token, guildid)
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