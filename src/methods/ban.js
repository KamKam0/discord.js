const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/ban")

module.exports.ban = async (informations) => {
    let passedOptions = {
        method: apiPath.create.method,
        token: informations.botToken,
        url: apiPath.create.url,
        urlIDS: informations,
        contentType: "url"
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.unban = async (informations) => {
    let passedOptions = {
        method: apiPath.delete.method,
        token: informations.botToken,
        url: apiPath.delete.url,
        urlIDS: informations,
        contentType: "url"
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.fetch = async (informations) => {
    let passedOptions = {
        method: apiPath.get.list.method,
        token: informations.botToken,
        url: apiPath.get.list.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const manager = require("../structures/managers/bans")
        let newData = new manager(informations.bot, informations.guild_id)
        newData._addMultiple(data)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.fetchspe = async (informations) => {
    let passedOptions = {
        method: apiPath.get.method,
        token: informations.botToken,
        url: apiPath.get.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/ban")
        data.guild_id = informations.guild_id
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}