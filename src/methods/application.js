const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/application")

module.exports.getMe = async (informations) => {

    let passedOptions = {
        method: apiPath.get.method,
        token: informations.botToken,
        url: apiPath.get.url,
        urlIDS: informations
    }

    let args = [ ]

    let callBackSuccess = (data) => {
        const single = require("../structures/singles/application")
        let newData = new single(data, informations.bot)
        return newData
    }

    return handler(args, passedOptions, callBackSuccess)
}

module.exports.getMetadata = async (informations) => {

    let passedOptions = {
        method: apiPath.metadata.get.method,
        token: informations.botToken,
        url: apiPath.metadata.get.url,
        urlIDS: informations
    }

    let args = [ ]

    let callBackSuccess = (data) => {
        const multiple = require("../structures/managers/applicationmetadatas")
        let newData = new multiple(informations.bot)
        newData._addMultiple(data)
        return newData
    }

    return handler(args, passedOptions, callBackSuccess)
}

module.exports.updateMetadata = async (informations, options) => {

    let passedOptions = {
        method: apiPath.metadata.modify.method,
        token: informations.botToken,
        url: apiPath.metadata.modify.url,
        urlIDS: informations
    }

    let args = [
        {value: options, data_name: "options", reason: true, required: true}
    ]

    let callBackSuccess = (data) => {
        const multiple = require("../structures/managers/applicationmetadatas")
        let newData = new multiple(informations.bot)
        newData._addMultiple(data)
        return newData
    }

    return handler(args, passedOptions, callBackSuccess)
}