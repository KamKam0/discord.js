const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/member")

module.exports.mute = async (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.method,
        token: informations.botToken,
        url: apiPath.modify.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [ 
        {value: options, data_name: "options", reason: true, required: true}
    ]
    let callBackSuccess = (data) => {
        const single = require("../structures/singles/member")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.unmute = async (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.method,
        token: informations.botToken,
        url: apiPath.modify.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: {communication_disabled_until: null, ...options}, data_name: "options", reason: true, required: true}
    ]
    let callBackSuccess = (data) => {
        const single = require("../structures/singles/member")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}