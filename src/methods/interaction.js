const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/interaction")
const commandApiPath = require("../api/v10/applicationcommands")
const { checkApplicationCommand } = require("../utils/functions").checks
const { createError } = require("../utils/functions").general
const utils = require("../utils/functions")
const getMe = require("./me").getuser
const errors = require("../utils/errors.json")
const ApplicationCommand = require("../structures/applicationscommands/command")
const ApplicationCommandManager = require("../structures/managers/applicationcommands")
const Message = require("../structures/singles/message")
const FormData = require("form-data")

module.exports.replyToAutocomplete = async (informations, choices) => {
    let args = [
        {value: { type: 8, data: { choices } }, data_name: "options"}
    ]
    let passedOptions = {
        method: apiPath.create.response.method,
        token: informations.botToken,
        url: apiPath.create.response.url,
        urlIDS: informations
    }

    return handler(args, passedOptions, null)
}

module.exports.reply = async (informations, response, isDeferredResponse=false) => {
    return new Promise(async (resolve, reject) => {
        if(!response) return reject(utils.checks.checkId("An error happened", {code: errors["44"].code, message: errors["44"].message, file: "Interaction"}))

        let method = informations.method
        let  url = (method && informations.path) ? apiPath.modify.reponse.url : apiPath.create.response.url
        if(!method) method = apiPath.create.response.method
        let options = utils.general.correctMessageData(response)

        if(!options) return reject(utils.checks.checkId("An error happened", {code: errors["8"].code, message: errors["8"].message, file: "Interaction"}))
        if(typeof options !== "object") return reject(utils.checks.checkId("An error happened", {code: errors["74"].code, message: errors["74"].message, file: "Interaction"}))

        let basedatas;

        if(response.modal && method.toLowerCase() === "post"){
            let passedOptions = {
                method: apiPath.create.response.method,
                url: apiPath.create.response.url,
                token: informations.botToken,
                urlIDS: informations,
            }
            let args = [
                {value: {type: 9, data: response.modal}, data_name: "options", order: 3}
            ]
            basedatas = handler(args, passedOptions, null)
        }
        else{
            let body = {}
            let passedOptions = {
                method,
                url,
                token: informations.botToken,
                urlIDS: informations,
                boundary: null
            }
            let callBackSuccess = function(data){
                if(!data) return data
                const single = require("../structures/singles/message")
                let newData = new single(data, informations.bot)
                return newData
            }
            body.message_reference = utils.checks.checkReference(options.message_reference)
            body.embeds = utils.checks.checkEmbed(options.embeds)
            body.components = utils.checks.checkComponents(options.components)
            body.sticker_ids = utils.checks.checkStickers(options.sticker_ids)
            body.content = utils.checks.checkContent(options.content)
            body.poll = utils.checks.checkPoll(options.poll)
            if(response.ephemeral === true) body.flags = 64

            let checkfiles = utils.checks.checkFiles(options.files)
            if(checkfiles && Array.isArray(checkfiles) === true && checkfiles[0]){
                let body_files = new FormData()
                for(const file in checkfiles){
                    body_files.append(`files[${file}]`, checkfiles[file].getBuffer(), checkfiles[file].getFullName());
                }
            
                passedOptions.boundary = body_files.getBoundary()
                if(method !== "PATCH") body_files.append("payload_json", JSON.stringify({type: isDeferredResponse ? 6 : 4, data: body}));
                else body_files.append("payload_json", JSON.stringify(body));
                let args = [
                    {value: body_files, data_name: "options", stringified: false, order: 3}
                ]
                passedOptions.contentType = "file"
                basedatas = handler(args, passedOptions, callBackSuccess)
            }else if(!body.content && !body.poll && body.embeds.length === 0 && body.components.length === 0 && body.sticker_ids.length === 0) return reject(createError("An error happened", {code: errors["74"].code, message: errors["74"].message, file: "Interaction"}))
            
            if(!checkfiles || !Array.isArray(checkfiles) || !checkfiles[0]) {
                let args = []

                if(method === "PATCH") args.push({value: body, data_name: "options"})
                else if (method) args.push({value: {type: isDeferredResponse ? 6 : 4, data: body}, data_name: "options"})
                basedatas = handler(args, passedOptions, callBackSuccess)
            }
        }

        basedatas
        .then(answer => resolve(answer))
        .catch(err => reject(err))
    })
}

module.exports.defer = async (informations) => {
    let passedOptions = {
        method: apiPath.create.response.method,
        token: informations.botToken,
        url: apiPath.create.response.url,
        urlIDS: informations
    }

    let args = [{
        value: {
            type: 5,
            data_type: 'number'
        },
        data_name: "options"
    }]

    return handler(args, passedOptions, null)
}

module.exports.modifyreply = async (informations, response) => {
    if(!informations.application_id) informations.application_id = informations.bot.user_id

    informations.method = apiPath.modify.reponse.method
    informations.path = apiPath.modify.reponse.url

    return this.reply(informations, response)
}

module.exports.deletereply = async (informations) => {
    if(!informations.application_id) informations.application_id = informations.bot.user_id
    
    let args = []
    let passedOptions = {
        method: apiPath.delete.reponse.method,
        token: informations.botToken,
        url: apiPath.delete.reponse.url,
        urlIDS: informations
    }

    return handler(args, passedOptions, null)
}

/**
 * 
 * @param {object} informations 
 * @param {object} options 
 * @param {boolean} options.with_localizations
 * @returns 
 */
module.exports.getcommands = async (informations, options) => {
    if(!informations.application_id) informations.application_id = informations.bot.user_id
    let passedOptions = {
        method: commandApiPath.get.global.method,
        token: informations.botToken,
        url: commandApiPath.get.global.url,
        urlIDS: informations
    }
    let args = [
        {
            value: options, 
            data_name: "infosURL", 
            order: 3, 
            required: false, 
            check: [
                {name: "with_localizations", type: "boolean"}
            ]
        }
    ]
    let callBackSuccess = (data) => {
        const commands = new ApplicationCommandManager(informations.bot)
        commands._addMultiple(data)
        return commands
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.getcommand = async (informations) => {
    if(!informations.application_id) informations.application_id = informations.bot.user_id
    let passedOptions = {
        method: commandApiPath.get.method,
        token: informations.botToken,
        url: commandApiPath.get.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = (data) => {
        return new ApplicationCommand(data, informations.bot)
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.deletecommand = async (informations) => {
    if(!informations.application_id) informations.application_id = informations.bot.user_id
    let passedOptions = {
        method: commandApiPath.delete.method,
        token: informations.botToken,
        url: commandApiPath.delete.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.getoriginalresponse = async (informations) => {
    if(!informations.application_id) informations.application_id = informations.bot.user_id
    let passedOptions = {
        method: apiPath.get.reponse.method,
        token: informations.botToken,
        url: apiPath.get.reponse.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = (data) => {
        return new Message(data, informations.bot)
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.createcommand = async (informations, options) => {
    if(!informations.application_id) informations.application_id = informations.bot.user_id
    let check = checkApplicationCommand(options)
    if(!check.status) return Promise.reject(check)
    
    let passedOptions = {
        method: commandApiPath.create.global.method,
        token: informations.botToken,
        url: commandApiPath.create.global.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    return handler(args, passedOptions, null)
}

module.exports.modifycommand = async (informations, options) => {
    if(!informations.application_id) informations.application_id = informations.bot.user_id
    let check = checkApplicationCommand(options)
    if(!check.status) return Promise.reject(check)
    
    let passedOptions = {
        method: commandApiPath.modify.method,
        token: informations.botToken,
        url: commandApiPath.modify.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    return handler(args, passedOptions, null)
}

/**
 * 
 * @param {object} informations 
 * @param {object} options 
 * @param {boolean} options.with_localizations
 * @returns 
 */
module.exports.getcommandsByGuild = async (informations, options) => {
    if(!informations.application_id) informations.application_id = informations.bot.user_id
    let passedOptions = {
        method: commandApiPath.get.guild.list.method,
        token: informations.botToken,
        url: commandApiPath.get.guild.list.url,
        urlIDS: informations
    }
    let args = [
        {
            value: options, 
            data_name: "infosURL", 
            order: 3, 
            required: false, 
            check: [
                {name: "with_localizations", type: "boolean"}
            ]
        }
    ]
    let callBackSuccess = (data) => {
        const commands = new ApplicationCommandManager(informations.bot)
        commands._addMultiple(data)
        return commands
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.getcommandByGuild = async (informations) => {
    if(!informations.application_id) informations.application_id = informations.bot.user_id
    let passedOptions = {
        method: commandApiPath.get.guild.method,
        token: informations.botToken,
        url: commandApiPath.get.guild.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = (data) => {
        return new ApplicationCommand(data, informations.bot)
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.deletecommandByGuild = async (informations) => {
    if(!informations.application_id) informations.application_id = informations.bot.user_id
    let passedOptions = {
        method: commandApiPath.delete.guild.method,
        token: informations.botToken,
        url: commandApiPath.delete.guild.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.createcommandByGuild = async (informations, options) => {
    if(!informations.application_id) informations.application_id = informations.bot.user_id
    let check = checkApplicationCommand(options)
    if(!check.status) return Promise.reject(check)
    
    let passedOptions = {
        method: commandApiPath.create.guild.method,
        token: informations.botToken,
        url: commandApiPath.create.guild.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    return handler(args, passedOptions, null)
}

module.exports.modifycommandByGuild = async (informations, options) => {
    if(!informations.application_id) informations.application_id = informations.bot.user_id
    let check = checkApplicationCommand(options)
    if(!check.status) return Promise.reject(check)
    
    let passedOptions = {
        method: commandApiPath.modify.guild.method,
        token: informations.botToken,
        url: commandApiPath.modify.guild.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    return handler(args, passedOptions, null)
}