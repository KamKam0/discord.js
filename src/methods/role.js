const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/role")


module.exports.add = async (informations, options) => {
    let passedOptions = {
        method: apiPath.add.method,
        token: informations.botToken,
        url: apiPath.add.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true}
    ]
    return handler(args, passedOptions, null)
}


module.exports.remove = async (informations, options) => {
    let passedOptions = {
        method: apiPath.remove.method,
        token: informations.botToken,
        url: apiPath.remove.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true}
    ]
    return handler(args, passedOptions, null)
}


module.exports.delete = async (informations, options) => {
    let passedOptions = {
        method: apiPath.delete.method,
        token: informations.botToken,
        url: apiPath.delete.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true}
    ]
    return handler(args, passedOptions, null)
}


module.exports.create = async (informations, options) => {
    let passedOptions = {
        method: apiPath.create.method,
        token: informations.botToken,
        url: apiPath.create.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/role")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}


module.exports.changepositions = async (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.positions.method,
        token: informations.botToken,
        url: apiPath.modify.positions.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true}
    ]
    return handler(args, passedOptions, null)
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
        {value: options, data_name: "options", order: 3, reason: true}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/role")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}