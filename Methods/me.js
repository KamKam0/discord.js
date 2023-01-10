const verify = require("../Utils/verify")

/**
 * 
 * @param {string} token 
 * @param {object} bot 
 * @returns 
 */
module.exports.getuser = async (token, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token", order:1}, {value: bot, data_name: "bot", order: 2}], "GET", `users/@me`, this.getuser, "getuser me")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/User"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {object} bot 
 * @param {object} options 
 * @returns 
 */
module.exports.setstatus = (bot, options) => {
    if(!bot) return ({code: require("../DB/errors.json")["34"].code, message: require("../DB/errors.json")["34"].message, file: "Me"})
    if(!options) return ({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Me"})
    if(typeof options !== "string") return ({code: require("../DB/errors.json")["38"].code, message: require("../DB/errors.json")["38"].message, file: "Me"})
    if(bot.state !== "ready") return ({code: require("../DB/errors.json")["39"].code, message: require("../DB/errors.json")["39"].message, file: "Me"})
    let presence = require("../Utils/functions").presence({since: bot.discordjs.lancement, activities: bot.presence.activities, status: options})
    let body = {
        op: 3,
        d: presence
    }
    bot.discordjs.ws.send(JSON.stringify(body))
    return presence
}

/**
 * 
 * @param {object} bot 
 * @param {object} options 
 * @returns 
 */
module.exports.setactivity = async (bot, options) => {
    if(!bot) return ({code: require("../DB/errors.json")["34"].code, message: require("../DB/errors.json")["34"].message, file: "Me"})
    if(!options) return ({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Me"})
    if(!Array.isArray(options)) return ({code: require("../DB/errors.json")["40"].code, message: require("../DB/errors.json")["40"].message, file: "Me"})
    if(bot.state !== "ready") return ({code: require("../DB/errors.json")["39"].code, message: require("../DB/errors.json")["39"].message, file: "Me"})
    if(!bot || !options || !Array.isArray(options)) return "incorrect infos"
    let presence = require("../Utils/functions").presence({since: bot.discordjs.lancement, activities: options, status: bot.presence.status})
    let body = {
        op: 3,
        d: presence
    }
    bot.discordjs.ws.send(JSON.stringify(body))
    return presence
}

/**
 * 
 * @param {object} bot 
 * @param {object} options 
 * @returns 
 */
module.exports.setpresence = async (bot, options) => {
    if(!bot) return ({code: require("../DB/errors.json")["34"].code, message: require("../DB/errors.json")["34"].message, file: "Me"})
    if(!options) return ({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Me"})
    if(typeof options !== "object") return ({code: require("../DB/errors.json")["24"].code, message: require("../DB/errors.json")["24"].message, file: "Me"})
    if(bot.state !== "ready") return ({code: require("../DB/errors.json")["39"].code, message: require("../DB/errors.json")["39"].message, file: "Me"})
    if(!options.status) return ({code: require("../DB/errors.json")["41"].code, message: require("../DB/errors.json")["41"].message, file: "Me"})
    if(!options.activities) return ({code: require("../DB/errors.json")["42"].code, message: require("../DB/errors.json")["42"].message, file: "Me"})
    let presence = require("../Utils/functions").presence({since: bot.discordjs.lancement, activities: options.activities, status: options.status})
    let body = {
        op: 3,
        d: presence
    }
    
    bot.discordjs.ws.send(JSON.stringify(body))
    return presence
}

/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @returns 
 */
module.exports.leave = async (token, guildid) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: guildid, value_data: "id", type: "string", data_name: "guildid"}], "DELETE", `users/@me/guilds/${guildid}`, this.leave, "leave me")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}