const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/poll")

module.exports.getAnswers = async (informations) => {
    let passedOptions = {
        method: apiPath.get.method,
        token: informations.botToken,
        url: apiPath.get.url,
        urlIDS: informations
    }
    let args = []
    let callBackSuccess = (data) => {
        const manager = require('../structures/managers/users')
        const users = new manager(informations.bot)
        users._addMultiple(data.users)
        return users
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.endPoll = async (informations) => {
    let passedOptions = {
        method: apiPath.end.method,
        token: informations.botToken,
        url: apiPath.end.url,
        urlIDS: informations
    }
    let args = []
    return handler(args, passedOptions, null)
}