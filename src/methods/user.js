const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/user")

module.exports.createDM = async (informations, user) => {
    let passedOptions = {
        method: apiPath.create.dm.method,
        token: informations.botToken,
        url: apiPath.create.dm.url,
        urlIDS: informations
    }
    let args = [
        {value: user, value_data: "id", data_name: "user", order:2},
        {value: options, data_name: "options", order: 3},
        {value: {recipient_id: user}, data_name: "options"}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/channels/channeldm")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess, null)
}

module.exports.createGroup = async (informations, accesses, nicks) => {
    let passedOptions = {
        method: apiPath.create.method,
        token: informations.botToken,
        url: apiPath.create.url,
        urlIDS: informations
    }
    let args = [
        {value: accesses, type: "array", data_name: "accesses", order:2}, 
        {value: nicks, type: "array", data_name: "nicks", order:3}, 
        {value: {access_tokens: accesses, nicks: nicks}, data_name: "options"}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/channels/channeldm")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess, null)
}

module.exports.createGroup = async (informations, accesses, nicks) => {
    let passedOptions = {
        method: apiPath.create.method,
        token: informations.botToken,
        url: apiPath.create.url,
        urlIDS: informations
    }
    let args = [
        {value: accesses, type: "array", data_name: "accesses", order:2}, 
        {value: nicks, type: "array", data_name: "nicks", order:3}, 
        {value: {access_tokens: accesses, nicks: nicks}, data_name: "options"}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/channels/channeldm")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess, null)
}

module.exports.send = async (bot, userid, options) => {
    return new Promise(async (resolve, reject) => {
        const createError = require("../utils/functions").createError
        if(!options) return reject(createError("An error happened", {code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "User"}))
        if(!user) return reject(createError("An error happened", {code: require("../DB/errors.json")["7"].code, message: require("../DB/errors.json")["7"].message, file: "User"}))
        if(!bot) return reject(createError("An error happened", {code: require("../DB/errors.json")["34"].code, message: require("../DB/errors.json")["34"].message, file: "User"}))
        
        this.createDM(bot, userid)
        .catch(err => reject(err))
        .then(channel => {
            require("./message").send(bot, channel.id, options, undefined, undefined, bot)
            .catch(err => reject(err))
            .then(message => resolve(message))
        })
        
    })
}