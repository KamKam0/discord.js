module.exports.awaitMessages = (bot, channelid, options) => {
    if(!channelid) return ({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Channel"})
    if(!bot) return ({code: require("../DB/errors.json")["34"].code, message: require("../DB/errors.json")["34"].message, file: "Channel"})
    if(!options) return ({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Channel"})
    if(!options) return ({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Channel"})
    if(typeof options !== "object") return ({code: require("../DB/errors.json")["24"].code, message: require("../DB/errors.json")["24"].message, file: "Channel"})
    if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Channel"})
    let aw = {}
    if(!options.time) return ({code: require("../DB/errors.json")["52"].code, message: require("../DB/errors.json")["52"].message, file: "Channel"})
    if(!options.nbre) return ({code: require("../DB/errors.json")["53"].code, message: require("../DB/errors.json")["53"].message, file: "Channel"})
    if(!options.cmdName) return ({code: require("../DB/errors.json")["54"].code, message: require("../DB/errors.json")["54"].message, file: "Channel"})
    if(!options.cmdCategory) return ({code: require("../DB/errors.json")["55"].code, message: require("../DB/errors.json")["55"].message, file: "Channel"})
    aw = {time: options.time, nbre: options.nbre, cmdName: options.cmdName, Category: options.cmdCategory, chID: channelid}
    if(options.id) aw.id = options.id
    if(options.oldDatas) aw.Datas = options.oldDatas
    aw.messages = []
    aw.Date = Date.now()
    aw.timeout = setTimeout(() => {
        bot.discordjs.awaitMessages = bot.discordjs.awaitMessages.filter(e => e.Date !== aw.Date)
        if(aw.Category === "Events") require(`../../../Handler/Events/${aw.cmdName}`)(aw.Datas, aw.messages, "error")
        else require(`../../../Handler/commands ${aw.Category}/${aw.cmdName}`).execute(aw.Datas, aw.messages, "error")
    }, aw.time)
    bot.discordjs.awaitMessages.push(aw)
}
module.exports.modify = (token, channelid, options) => {
    return new Promise(async (resolve, reject) => {
        // Options Structure: depends on the type of the channel
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Channel"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Channel"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Channel"})
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Channel"})
        const url = `${baseurl}/channels/${channelid}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "PATCH", body: JSON.stringify(options)}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.modify(token, channelid, options)
                    .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - modify 1, channel method")
                    er.content = err
                    reject(er)
                })
                    .then(datas => { 
                        const channel = new (require(`../Gestionnaires/Individual/Channels_/Channel_${datas.type}`))(datas)
                        return resolve(channel)
                    })
                }, datas.retry_after * 1000)
            }else{
                    let er = new Error("Une erreur s'est produite lors de la requête - modify 2, channel method")
                    er.content = datas
                    return reject(er)
                }
        }
        else{
            const channel = new (require(`../Gestionnaires/Individual/Channels_/Channel_${datas.type}`))({...datas, token: token})
            return resolve(channel)
        }
    })
}
module.exports.bulkdelete = (token, channelid, ids) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Channel"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Channel"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Channel"})
        if(!ids) return reject({code: require("../DB/errors.json")["13"].code, message: require("../DB/errors.json")["13"].message, file: "Channel"})
        if(!Array.isArray(ids)) return reject({code: require("../DB/errors.json")["58"].code, message: require("../DB/errors.json")["58"].message, file: "Channel"})
        const url = `${baseurl}/channels/${channelid}/messages/bulk-delete`
        const basedatas = await fetch(url, {headers: baseheaders, method: "POST", body: JSON.stringify({messages: ids})}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.bulkdelete(token, channelid, ids)
                    .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - bulkdelete 1, channel method")
                    er.content = err
                    reject(er)
                })
                    .then(datas => { return resolve(datas)})
                }, datas.retry_after * 1000)
            }else{
                    let er = new Error("Une erreur s'est produite lors de la requête - bulkdelete 2, channel method")
                    er.content = datas
                    return reject(er)
                }
        }
    })
}
module.exports.getinvites = (token, channelid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Channel"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Channel"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Channel"})
        const url = `${baseurl}/channels/${channelid}/invites`
        const basedatas = await fetch(url, {headers: baseheaders, method: "GET"}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.getinvites(token, channelid)
                    .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - getinvites 1, channel method")
                    er.content = err
                    reject(er)
                })
                    .then(datas => { 
                        const invites = new (require("../Gestionnaires/Multiple/Invites"))()
                        invites.AddInvites(datas)
                        return resolve(invites)
                    })
                }, datas.retry_after * 1000)
            }else{
                    let er = new Error("Une erreur s'est produite lors de la requête - getinvites 2, channel method")
                    er.content = datas
                    return reject(er)
                }
        }
        else{
            const invites = new (require("../Gestionnaires/Multiple/Invites"))()
            invites.AddInvites(datas.map(da => { return {...da, token: token}}))
            return resolve(invites)
        }
    })
}
module.exports.createinvite = (token, channelid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Channel"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Channel"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Channel"})
        const url = `${baseurl}/channels/${channelid}/invites`
        const basedatas = await fetch(url, {headers: baseheaders, method: "POST", body: JSON.stringify({})}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.createinvite(token, channelid)
                    .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - createinvite 1, channel method")
                    er.content = err
                    reject(er)
                })
                    .then(datas => { return resolve(datas)})
                }, datas.retry_after * 1000)
            }else{
                    let er = new Error("Une erreur s'est produite lors de la requête - createinvite 2, channel method")
                    er.content = datas
                    return reject(er)
                }
        }
        else return resolve(new (require("../Gestionnaires/Individual/Invite")({...datas, token: token})))
    })
}
module.exports.editpermissions = (token, channelid, newoverwrite) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Channel"})
        if(!newoverwrite) return reject({code: require("../DB/errors.json")["14"].code, message: require("../DB/errors.json")["14"].message, file: "Channel"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Channel"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Channel"})
        if(!Array.isArray(newoverwrite)) return reject({code: require("../DB/errors.json")["59"].code, message: require("../DB/errors.json")["59"].message, file: "Channel"})
        if(!require("../Utils/functions").check_overwrites(newoverwrite)) return reject({code: require("../DB/errors.json")["60"].code, message: require("../DB/errors.json")["60"].message, file: "Channel"})
        const url = `${baseurl}/channels/${channelid}/permissions/${newoverwrite.id}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "PUT", body: JSON.stringify(newoverwrite)}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.editpermissions(token, channelid, newoverwrite)
                    .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - editpermissions 1, channel method")
                    er.content = err
                    reject(er)
                })
                    .then(datas => { return resolve(datas)})
                }, datas.retry_after * 1000)
            }else{
                    let er = new Error("Une erreur s'est produite lors de la requête - editpermissions 2, channel method")
                    er.content = datas
                    return reject(er)
                }
        }
    })
}
module.exports.deletepermission = (token, channelid, overwrite) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Channel"})
        if(!overwrite) return reject({code: require("../DB/errors.json")["15"].code, message: require("../DB/errors.json")["15"].message, file: "Channel"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Channel"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Channel"})
        if(!Array.isArray(overwrite)) return reject({code: require("../DB/errors.json")["59"].code, message: require("../DB/errors.json")["59"].message, file: "Channel"})
        if(!require("../Utils/functions").check_overwrites(overwrite)) return reject({code: require("../DB/errors.json")["60"].code, message: require("../DB/errors.json")["60"].message, file: "Channel"})
        const url = `${baseurl}/channels/${channelid}/permissions/${overwrite.id}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "DELETE"}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.deletepermission(token, channelid, overwrite)
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
module.exports.follownews = (token, channelid, targetid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Channel"})
        if(!targetid) return reject({code: require("../DB/errors.json")["16"].code, message: require("../DB/errors.json")["16"].message, file: "Channel"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Channel"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Channel"})
        if(!require("../Utils/functions").check_id(targetid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Channel"})
        const url = `${baseurl}/channels/${channelid}/followers`
        const basedatas = await fetch(url, {headers: baseheaders, method: "POST", body: JSON.stringify({webhook_channel_id: targetid})}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.follownews(token, channelid, targetid)
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
        else return resolve(datas)
    })
}
module.exports.getpins = (token, channelid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Channel"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Channel"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Channel"})
        const url = `${baseurl}/channels/${channelid}/pins`
        const basedatas = await fetch(url, {headers: baseheaders, method: "POST"}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.getpins(token, channelid)
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
        else{
            const messages = new (require("../Gestionnaires/Multiple/Messages"))()
            messages.AddMessages(datas.map(da => { return {...da, token: token}}))
            return resolve(datas)
        }
    })
}
module.exports.triggertyping = (token, channelid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Channel"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Channel"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Channel"})
        const url = `${baseurl}/channels/${channelid}/typing`
        const basedatas = await fetch(url, {headers: baseheaders, method: "POST"}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.triggertyping(token, channelid)
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
module.exports.create = (token, guildid, options) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Channel"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Channel"})
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Channel"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Channel"})
        const url = `${baseurl}/guilds/${guildid}`
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
        else return resolve(new (require(`../Gestionnaires/Individual/Channels_/Channel_${datas.type}`)({...datas, token: token, guildid: guildid})))
    })
}