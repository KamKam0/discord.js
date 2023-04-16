const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/message")
const emojiApiPath = require("../api/v10/reaction")
const utils = require("../utils/functions")
const errors = require("../utils/errors.json")

module.exports.send = async (informations, options) => {
    return new Promise(async (resolve, reject) => {
        if(!options) return reject(utils.general.createError("An error happened", {code: errors["8"].code, message: errors["8"].message, file: "Message"}))
        let method = informations.method
        let  url = (method && informations.path) ? apiPath.modify.url : apiPath.create.url
        if(!method) method = apiPath.create.method
        options = utils.general.correctMessageData(options)

        if(!options) return reject(utils.checks.checkId("An error happened", {code: errors["8"].code, message: errors["8"].message, file: "Interaction"}))
        if(typeof options !== "object") return reject(utils.checks.checkId("An error happened", {code: errors["74"].code, message: errors["74"].message, file: "Interaction"}))
        
        let body_files;
        let body = {}
        body.message_reference = utils.checks.checkReference(options.message_reference)
        body.embeds = utils.checks.checkEmbed(options.embeds)
        body.components = utils.checks.checkComponents(options.components)
        body.content = utils.checks.checkContent(options.content)
        if(!method) body.sticker_ids = utils.checks.checkStickers(options.sticker_ids)
        
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
            {value: body_files || body, data_name: "options", stringified: false, order: 3}
        ]
        let passedOptions = {
            method,
            url,
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
        
        return handler(args, passedOptions, callBackSuccess)
        .then(answer => resolve(answer))
        .catch(err => reject(err))
    })
}

module.exports.modify = async (informations, options) => {
    return new Promise(async (resolve, reject) => {
        informations.method = apiPath.modify.method
        informations.path = apiPath.modify.url

        this.send(informations, options)
        .then(answer => resolve(answer))
        .catch(err => reject(err))
    })
}


module.exports.fetch_message = async (informations) => {
    let passedOptions = {
        token: informations.botToken,
        urlIDS: informations,
        method: apiPath.get.method,
        url: apiPath.get.url
    }

    let callBackSuccess = function (data){
        const single = require("../structures/singles/message")
        let newData = new single(data, informations.bot)
        return newData
    }
    let args = []
    return handler(args, passedOptions, callBackSuccess)
}

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams] 
 * @param {string} [queryParams.before] ID
 * @param {string} [queryParams.after] ID
 * @param {number} [queryParams.limit] 
 * @param {string} [queryParams.around] ID
 * @returns 
 */
module.exports.fetch_messages = async (informations, queryParams) => {
    let passedOptions = {
        token: informations.botToken,
        urlIDS: informations,
        method: apiPath.get.list.method,
        url: apiPath.get.list.url
    }

    let callBackSuccess = function (data){
        const manager = require("../structures/managers/messages")
        const messages = new manager(informations.bot)
        messages._addMultiple(data)
        return messages
    }
    let args = [
        {
            value: queryParams, 
            data_name: "infosURL",
            required: false,
            check: [
                {name: "before", type: "number", data_type: "id"}, 
                {name: "after", type: "number", data_type: "id"}, 
                {name: "limit", type: "number", limit: 100}, 
                {name: "around", type: "number", data_type: "id"}
            ]
        }
    ]
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.crosspost = async (informations) => {
    let passedOptions = {
        method: apiPath.crosspost.method,
        token: informations.botToken,
        url: apiPath.crosspost.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/message")
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

module.exports.addreaction = async (informations) => {
    let passedOptions = {
        method: emojiApiPath.create.method,
        token: informations.botToken,
        url: emojiApiPath.create.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.removereaction = async (informations) => {
    let passedOptions = {
        method: emojiApiPath.delete.method,
        token: informations.botToken,
        url: emojiApiPath.delete.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.removeuserreaction = async (informations) => {
    let passedOptions = {
        method: emojiApiPath.delete.user.method,
        token: informations.botToken,
        url: emojiApiPath.delete.user.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.removeallreactions = async (informations) => {
    let passedOptions = {
        method: emojiApiPath.delete.all.method,
        token: informations.botToken,
        url: emojiApiPath.delete.all.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.removeallreactionemoji = async (informations) => {
    let passedOptions = {
        method: emojiApiPath.delete.allOfOne.method,
        token: informations.botToken,
        url: emojiApiPath.delete.allOfOne.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}


module.exports.pin = async (informations, options) => {
    let passedOptions = {
        method: apiPath.create.pin.method,
        token: informations.botToken,
        url: apiPath.create.pin.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: false}
    ]
    return handler(args, passedOptions, null)
}


module.exports.unpin = async (informations, options) => {
    let passedOptions = {
        method: apiPath.delete.pin.method,
        token: informations.botToken,
        url: apiPath.delete.pin.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: false}
    ]
    return handler(args, passedOptions, null)
}

module.exports.fetch_reactions = async (informations) => {
    let passedOptions = {
        method: emojiApiPath.get.method,
        token: informations.botToken,
        url: emojiApiPath.get.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams]
 * @param {string} [queryParams.after] ID
 * @param {number} [queryParams.limit] 
 * @returns 
 */
module.exports.fetch_reaction = async (informations, queryParams) => {
    let passedOptions = {
        method: emojiApiPath.get.listOne.method,
        token: informations.botToken,
        url: emojiApiPath.get.listOne.url,
        urlIDS: informations
    }
    let args = [
        {
            value: queryParams, 
            data_name: "infosURL",
            required: false,
            check: [
                {name: "after", type: "number", data_type: "id"}, 
                {name: "limit", type: "number", limit: 100}, 
            ]
        }
    ]
    let callBackSuccess = function (data){
        const multiple = require("../structures/managers/users")
        let newData = new multiple(informations.bot)
        newData._addMultiple(data)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}
