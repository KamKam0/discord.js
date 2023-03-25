const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/sticker")
const utils = require("../utils/functions")
const errors = require("../utils/errors.json")

module.exports.create = async (informations, name, file, tags, description) => {
    return new Promise(async (resolve, reject) => {
        if(!token) return reject(utils.general.createError("An error happened", {code: errors["12"].code, message: errors["12"].message, file: "Stickers"}))
        if(!guildid) return reject(utils.general.createError("An error happened", {code: errors["1"].code, message: errors["1"].message, file: "Stickers"}))
        if(!name) return reject(utils.general.createError("An error happened", {code: errors["19"].code, message: errors["19"].message, file: "Stickers"}))
        if(!file) return reject(utils.general.createError("An error happened", {code: errors["27"].code, message: errors["27"].message, file: "Stickers"}))
        if(!tags) return reject(utils.general.createError("An error happened", {code: errors["28"].code, message: errors["28"].message, file: "Stickers"}))
        if(!description) return reject(utils.general.createError("An error happened", {code: errors["29"].code, message: errors["29"].message, file: "Stickers"}))
        if(!utils.checks.checkId(guildid)) return reject(utils.general.createError("An error happened", {code: errors["49"].code, message: errors["49"].message, file: "Stickers"}))
        
        const FormData = require("form-data")
        let body = new FormData()
        body.append(`files[0]`, file.buffer, `${file.name}.${file.extension}`);
        let bodyAdding = {name: name, tags: tags, description: description}
        body.append("payload_json", JSON.stringify(bodyAdding))

        let passedOptions = {
            method: apiPath.create.method,
            url: apiPath.create.url,
            token: informations.botToken,
            urlIDS: informations,
            contentType: "file",
            boundary: body.getBoundary()
        }
        let args = [
            {value: body, data_name: "options", order: 3}
        ]
        let callBackSuccess = function(data){
            const single = require("../structures/singles/sticker")
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
    return handler(args, passedOptions, null)
}