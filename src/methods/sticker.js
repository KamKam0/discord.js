const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/sticker")
const FormData = require("form-data")
const fileManager = require("../handlers/filemanager")


module.exports.create = async (informations, options) => {
    if(typeof options === "object" && typeof options.file === "object" && options.file instanceof fileManager){
        let extensions = ["gif", "png", "apng"]
        if(!extensions.find(ext => ext === options.file.getExtension().toLowerCase())) return Promise.reject(`The sticker extension is not one of (${extensions.join(", ")})`)
    }else return Promise.reject("Invalid type of file")

    let body = new FormData()
    body.append(`file`, options.file.getBuffer(), options.file.getFullName());
    let boundary = body.getBoundary()
    delete options.file
    body.append("payload_json", JSON.stringify(options))
    let passedOptions = {
        method: apiPath.create.method,
        url: apiPath.create.url,
        token: informations.botToken,
        urlIDS: informations,
        contentType: "file",
        boundary,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: body, data_name: "options", order: 3, reason: true, required: false}
    ]
    let callBackSuccess = function(data){
        const single = require("../structures/singles/sticker")
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
        {value: options, data_name: "options", order: 3, reason: true, required: false}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/sticker")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}