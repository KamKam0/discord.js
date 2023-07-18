const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/webhook")
const errors = require("../utils/errors.json")
const utils = require("../utils/functions")


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
        const single = require("../structures/singles/webhook")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.getchannel = async (informations) => {
    let passedOptions = {
        method: apiPath.get.channelWebhooks.method,
        token: informations.botToken,
        url: apiPath.get.channelWebhooks.url,
        urlIDS: informations
    }
    let args = []
    let callBackSuccess = (data) => {
        const manager = require("../structures/managers/webhooks")
        let newManager = new manager(informations.bot)
        newManager._addMultiple(data)
        return newManager
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
    let args = []
    let callBackSuccess = (data) => {
        const single = require("../structures/singles/webhook")
        let newClass = new single(data, informations.bot)
        return newClass
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
        {value: options, data_name: "options", reason: true, required: true}
    ]
    let callBackSuccess = (data) => {
        const single = require("../structures/singles/webhook")
        let newClass = new single(data, informations.bot)
        return newClass
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

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams] 
 * @param {boolean} [queryParams.wait]
 * @param {string} [queryParams.thread_id] ID
 * @returns 
 */
module.exports.execute = async (informations, options, queryParams) => {
    return new Promise(async (resolve, reject) => {
        
        if(!options) return reject(utils.general.createError("An error happened", {code: errors["8"].code, message: errors["8"].message, file: "Message"}))
        options = utils.general.correctMessageData(options)

        if(!options) return reject(utils.checks.checkId("An error happened", {code: errors["8"].code, message: errors["8"].message, file: "Interaction"}))
        if(typeof options !== "object") return reject(utils.checks.checkId("An error happened", {code: errors["74"].code, message: errors["74"].message, file: "Interaction"}))
        
        let body_files;
        let body = {}
        body.message_reference = utils.checks.checkReference(options.message_reference)
        body.embeds = utils.checks.checkEmbed(options.embeds)
        body.components = utils.checks.checkComponents(options.components)
        body.content = utils.checks.checkContent(options.content)
        body.sticker_ids = utils.checks.checkStickers(options.sticker_ids)
        
        let checkfiles = utils.checks.checkFiles(options.files)
        let boundary = null
        if(checkfiles && Array.isArray(checkfiles) === true && checkfiles[0]){
            const FormData = require("form-data")
            body_files = new FormData()
            for(const file in checkfiles){
                body_files.append(`files[${file}]`, checkfiles[file].getBuffer(), checkfiles[file].getFullName());
            }
            boundary = body_files.getBoundary()
            body_files.append("payload_json", JSON.stringify(body))
        }else if(!body.content && body.embeds.length === 0 && body.components.length === 0 && body.sticker_ids?.length === 0) return reject(utils.general.createError("An error happened", {code: errors["74"].code, message: errors["74"].message, file: "Message"}))

        let args = [
            {value: body_files || body, data_name: "options", stringified: false, order: 3},
            {
                value: queryParams, 
                data_name: "infosURL",
                required: false,
                check: [
                    {name: "thread_id", type: "string", data_type: "id"}, 
                    {name: "wait", type: "boolean"}
                ]
            }
        ]

        let passedOptions = {
            method: apiPath.execute.method,
            url: apiPath.execute.url,
            token: informations.botToken,
            urlIDS: informations,
            boundary,
            contentType: body_files ? "file" : "basic"
        }

        let callBackSuccess = function(data){
            if(!data) return data
            const single = require("../structures/singles/message")
            let newData = new single(data, informations.bot)
            return newData
        }
        
        handler(args, passedOptions, callBackSuccess)
        .then(answer => resolve(answer))
        .catch(err => reject(err))
    })
}

// // INFOS URL
// /*thread_id	snowflake	id of the thread to send the message in	false
// wait	boolean	waits for server confirmation of message send before response (defaults to true; when false a message that is not saved does not return an error)	false*/
// module.exports.executeslaskcompatible = async (token, webhook, options, bot) => {//cp
//     return
// }

// // INFOS URL
// /*thread_id	snowflake	id of the thread to send the message in	false
// wait	boolean	waits for server confirmation of message send before response (defaults to true; when false a message that is not saved does not return an error)	false*/
// module.exports.executegitcompatible = async (token, webhook, options, bot) => {//cp
//     return
// }

/**
 * 
 * @param {object} informations 
 * @param {object} options 
 * @param {object} [queryParams] 
 * @param {string} [queryParams.thread_id] ID
 * @returns 
 */
module.exports.modifymessage = async (informations, options, queryParams) => {
    let passedOptions = {
        method: apiPath.message.modify.method,
        token: informations.botToken,
        url: apiPath.message.modify.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3},
        {
            value: queryParams, 
            data_name: "infosURL",
            required: false,
            check: [
                {name: "thread_id", type: "string", data_type: "id"}
            ]
        }
    ]
    let callBackSuccess = function(data){
        const single = require("../structures/singles/message")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams] 
 * @param {string} [queryParams.thread_id] ID
 * @returns 
 */
module.exports.getmessage = async (informations, queryParams) => {
    let passedOptions = {
        method: apiPath.message.get.method,
        token: informations.botToken,
        url: apiPath.message.get.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {
            value: queryParams, 
            data_name: "infosURL",
            required: false,
            check: [
                {name: "thread_id", type: "string", data_type: "id"}
            ]
        }
    ]
    let callBackSuccess = function(data){
        const single = require("../structures/singles/message")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams] 
 * @param {string} [queryParams.thread_id] ID
 * @returns 
 */
module.exports.deletemessage = async (informations, queryParams) => {
    let passedOptions = {
        method: apiPath.message.delete.method,
        token: informations.botToken,
        url: apiPath.message.delete.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {
            value: queryParams, 
            data_name: "infosURL",
            required: false,
            check: [
                {name: "thread_id", type: "string", data_type: "id"}
            ]
        }
    ]
    return handler(args, passedOptions, null)
}