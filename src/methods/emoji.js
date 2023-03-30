const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/emoji")
const utils = require("../utils/functions")
const errors = require("../utils/errors.json")

module.exports.create = async (informations, name, imagedata, roles) => {
    return new Promise(async (resolve, reject) => {
        if(!name) return reject(utils.general.createError("An error happened", {code: errors["19"].code, message: errors["19"].message, file: "Emoji"}))
        if(!imagedata) return reject(utils.general.createError("An error happened", {code: errors["20"].code, message: errors["20"].message, file: "Emoji"}))
        if(!roles) return reject(utils.general.createError("An error happened", {code: errors["21"].code, message: errors["21"].message, file: "Emoji"}))
        
        let body = {
            name,
            image: imagedata,
            roles
        }

        let passedOptions = {
            method: apiPath.create.method,
            url: apiPath.create.url,
            token: informations.botToken,
            urlIDS: informations
        }
        let args = [
            {value: body, data_name: "options", order: 3}
        ]
        let callBackSuccess = function(data){
            const single = require("../structures/singles/emoji")
            let newData = new single(data, informations.bot)
            return newData
        }
        handler(args, passedOptions, callBackSuccess)
        .then(answer => resolve(answer))
        .catch(err => reject(err))
    })
}

module.exports.delete = async (informations) => {
    let passedOptions = {
        method: apiPath.delete.method,
        token: informations.botToken,
        url: apiPath.delete.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.modify = async (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.method,
        token: informations.botToken,
        url: apiPath.modify.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/emoji")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}