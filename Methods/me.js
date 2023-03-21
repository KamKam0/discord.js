const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/user")

module.exports.getuser = async (informations) => {
    let passedOptions = {
        method: apiPath.get.current.method,
        token: informations.botToken,
        url: apiPath.get.current.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/user")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess, null)
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

module.exports.leave = async (informations) => {
    let passedOptions = {
        method: apiPath.leave.method,
        token: informations.botToken,
        url: apiPath.leave.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null, null)
}