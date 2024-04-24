const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/emoji")
const fileManager = require("../handlers/filemanager")


module.exports.create = async (informations, options) => {
    if(typeof options === "object" && typeof options.image === "object" && options.image instanceof fileManager){
        let extensions = ["jpg", "gif", "png"]
        if(!extensions.includes(options.image.getExtension().toLowerCase())) return Promise.reject(`The emoji extension is not one of (${extensions.join(", ")})`)
        options.image = options.image.getImageFile()
    }
    let passedOptions = {
        method: apiPath.create.method,
        url: apiPath.create.url,
        token: informations.botToken,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: true}
    ]
    let callBackSuccess = function(data){
        const single = require("../structures/singles/emoji")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
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
        {value: options, data_name: "options", order: 3, reason: true, required: false}
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
        {value: options, data_name: "options", order: 3, reason: true, required: true}
    ]
    let callBackSuccess = (data) => {
        const single = require("../structures/singles/emoji")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}