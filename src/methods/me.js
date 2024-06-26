const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/user")
const utils = require('../utils/functions')
const apiBotPath = require("../api/v10/application")
const gateawayApiPath = require("../api/v10/gateway")
const errors = require("../utils/errors.json")
const presenceFunction = require("../utils/functions").general.presence

module.exports.getuser = async (informations) => {
    let passedOptions = {
        method: apiPath.get.current.method,
        token: informations.botToken,
        url: apiPath.get.current.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = (data) => {
        const single = require("../structures/singles/user")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.modifybBot = async (informations, options) => {
    let passedOptions = {
        method: apiBotPath.modify.method,
        token: informations.botToken,
        url: apiBotPath.modify.url,
        urlIDS: informations
    }

    if (options.icon) {
        let verification = utils.checks.checkFiles([options.icon])
        if (verification) {
            options.icon = verification[0].getImageFile()
        } else {
            delete options.icon
        }
    }
    if (options.cover_image) {
        let verification = utils.checks.checkFiles([options.cover_image])
        if (verification) {
            options.cover_image = verification[0].getImageFile()
        } else {
            delete options.cover_image
        }
    }

    let args = [
        {value: options, data_name: "options"}
    ]
    return handler(args, passedOptions, null)
}

/**
 * 
 * @param {object} bot 
 * @param {object} options 
 * @returns 
 */
module.exports.setstatus = (bot, options) => {
    if(!bot) return ({code: errors["34"].code, message: errors["34"].message, file: "Me"})
    if(!options) return ({code: errors["8"].code, message: errors["8"].message, file: "Me"})
    if(typeof options !== "string") return ({code: errors["38"].code, message: errors["38"].message, file: "Me"})
    if(bot.state !== "ready") return ({code: errors["39"].code, message: errors["39"].message, file: "Me"})
    let presence = presenceFunction({since: bot.ws.discordSide.lancement, activities: bot.presence.activities, status: options})
    let body = {
        op: 3,
        d: presence
    }
    bot.ws.discordSide.ws.send(JSON.stringify(body))
    return presence
}

/**
 * 
 * @param {object} bot 
 * @param {object} options 
 * @returns 
 */
module.exports.setactivity = async (bot, options) => {
    if(!bot) return ({code: errors["34"].code, message: errors["34"].message, file: "Me"})
    if(!options) return ({code: errors["8"].code, message: errors["8"].message, file: "Me"})
    if(!Array.isArray(options)) return ({code: errors["40"].code, message: errors["40"].message, file: "Me"})
    if(bot.state !== "ready") return ({code: errors["39"].code, message: errors["39"].message, file: "Me"})
    if(!bot || !options || !Array.isArray(options)) return "incorrect infos"
    let presence = presenceFunction({since: bot.ws.discordSide.lancement, activities: options, status: bot.presence.status})
    let body = {
        op: 3,
        d: presence
    }
    bot.ws.discordSide.ws.send(JSON.stringify(body))
    return presence
}

/**
 * 
 * @param {object} bot 
 * @param {object} options 
 * @returns 
 */
module.exports.setpresence = async (bot, options) => {
    if(!bot) return ({code: errors["34"].code, message: errors["34"].message, file: "Me"})
    if(!options) return ({code: errors["8"].code, message: errors["8"].message, file: "Me"})
    if(typeof options !== "object") return ({code: errors["24"].code, message: errors["24"].message, file: "Me"})
    if(bot.state !== "ready") return ({code: errors["39"].code, message: errors["39"].message, file: "Me"})
    if(!options.status) return ({code: errors["41"].code, message: errors["41"].message, file: "Me"})
    if(!options.activities) return ({code: errors["42"].code, message: errors["42"].message, file: "Me"})
    let presence = presenceFunction({since: bot.ws.discordSide.lancement, activities: options.activities, status: options.status})
    let body = {
        op: 3,
        d: presence
    }
    
    bot.ws.discordSide.ws.send(JSON.stringify(body))
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
    return handler(args, passedOptions, null)
}

module.exports.getGateway = async (token) => {
    let passedOptions = {
        method: gateawayApiPath.get.bot.method,
        url: gateawayApiPath.get.bot.url,
        urlIDS: {},
        token
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}