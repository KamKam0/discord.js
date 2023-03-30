const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/message")
const emojiApiPath = require("../api/v10/reaction")
const utils = require("../utils/functions")
const errors = require("../utils/errors.json")

module.exports.send = async (informations, options) => {
    return new Promise(async (resolve, reject) => {
        if(!options) return reject(utils.general.createError("An error happened", {code: errors["8"].code, message: errors["8"].message, file: "Message"}))
        let method = informations.method
        let  url = (method && informations.path) ? apiPath.create.url : apiPath.create.url
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
                body_files.append(`files[${file}]`, checkfiles[file].buffer, `${checkfiles[file].name}.${checkfiles[file].extension}`);
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
            if(data.requestStatus === 204) return data
            const single = require("../structures/singles/message")
            let newData = new single(data, informations.bot)
            return newData
        }
        
        handler(args, passedOptions, callBackSuccess)
        .then(answer => resolve(answer))
        .catch(err => reject(err))
    })
}

module.exports.modify = async (informations, options) => {
    informations.method = apiPath.modify.method
    informations.path = apiPath.modify.url

    return this.send(informations, options)
}

module.exports.fetch_messages = async (informations, limit) => {
    let passedOptions = {
        token: informations.botToken,
        urlIDS: informations
    }
    
    if(!limit || isNaN(limit) || Number(limit) < 1 || Number(limit) > 100){
        if(!isNaN(limit) && limit.length >= 22) limit = {type: "sfetch", id: limit}
        else limit = {type: "gfetch", number: limit}
    }else limit = {type: "gfetch", number: limit}

    if(limit.type === "sfetch"){
        passedOptions.method = apiPath.get.method
        passedOptions.url = apiPath.get.url
        let callBackSuccess = function (data){
            const single = require("../structures/singles/message")
            let newData = new single(data, informations.bot)
            return newData
        }
        let args = []
        return handler(args, passedOptions, callBackSuccess)
    }else{
        passedOptions.method = apiPath.get.list.method
        passedOptions.url = apiPath.get.list.url
        let callBackSuccess = function (data){
            const manager = require("../structures/singles/message")
            const messages = new manager(informations.bot)
            messages._addMultiple(data)
            return messages
        }
        let args = []
        return handler(args, passedOptions, callBackSuccess)
    }
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

module.exports.pin = async (informations) => {
    let passedOptions = {
        method: apiPath.create.pin.method,
        token: informations.botToken,
        url: apiPath.create.pin.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.unpin = async (informations) => {
    let passedOptions = {
        method: apiPath.delete.pin.method,
        token: informations.botToken,
        url: apiPath.delete.pin.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.fetch_reactions = async (token, channelid, messageid, bot) => {//à tester
    return new Promise(async (resolve, reject) => {
        this.fetch_messages(token, channelid, messageid, bot)
        .catch(err => reject(err))
        .then(datas => resolve(datas.reactions))
    })
}

module.exports.fetch_reaction = async (informations) => {//encodeURIComponent(emoji)//à tester
    let passedOptions = {
        method: emojiApiPath.get.listOne.method,
        token: informations.botToken,
        url: emojiApiPath.get.listOne.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const multiple = require("../structures/managers/messages")
        let newData = new multiple(informations.bot)
        newData._addMultiple(data)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}