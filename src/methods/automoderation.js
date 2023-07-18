const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/automoderation")

module.exports.create = async (informations, options) => {
    let passedOptions = {
        method: apiPath.create.method,
        token: informations.botToken,
        url: apiPath.create.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: true}
    ]
    let callBackSuccess = (data) => {
        const single = require("../structures/singles/automoderation")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.getall = async (informations) => {
    let passedOptions = {
        method: apiPath.get.list.method,
        token: informations.botToken,
        url: apiPath.get.list.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    let callBackSuccess = (data) => {
        const single = require("../structures/managers/automoderations")
        let newData = new single(informations.bot)
        newData._addMultiple(data)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.get = async (informations) => {
    let passedOptions = {
        method: apiPath.get.method,
        token: informations.botToken,
        url: apiPath.get.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = (data) => {
        const single = require("../structures/singles/automoderation")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.modify = async (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.method,
        token: informations.botToken,
        url: apiPath.modify.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: true}
    ]
    let callBackSuccess = (data) => {
        const single = require("../structures/singles/automoderation")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.delete = async (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.method,
        token: informations.botToken,
        url: apiPath.modify.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: false}
    ]
    return handler(args, passedOptions, null)
}