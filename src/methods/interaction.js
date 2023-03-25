const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/interaction")
const commandApiPath = require("../api/v10/applicationcommands")
const { checkApplicationCommand } = require("../utils/functions").checks
const utils = require("../utils/functions")
const getMe = require("./me").getuser
const errors = require("../utils/errors.json")

module.exports.reply = async (informations, interaction, response) => {
    return new Promise(async (resolve, reject) => {
        if(!interaction) return reject(utils.checks.checkId("An error happened", {code: errors["43"].code, message: errors["43"].message, file: "Interaction"}))
        if(!response) return reject(utils.checks.checkId("An error happened", {code: errors["44"].code, message: errors["44"].message, file: "Interaction"}))
        if(!interaction.id) return reject(utils.checks.checkId("An error happened", {code: errors["45"].code, message: errors["45"].message, file: "Interaction"}))
        if(!interaction.token) return reject(utils.checks.checkId("An error happened", {code: errors["45"].code, message: errors["45"].message, file: "Interaction"}))
        
        let method = informations.method
        let  url = (method && informations.path) ? apiPath.modify.reponse.url : apiPath.create.response.url
        if(!method) method = apiPath.create.response.method
        let options = utils.general.correctMessageData(response)

        if(!options) return reject(utils.checks.checkId("An error happened", {code: errors["8"].code, message: errors["8"].message, file: "Interaction"}))
        if(typeof options !== "object") return reject(utils.checks.checkId("An error happened", {code: errors["74"].code, message: errors["74"].message, file: "Interaction"}))
        
        let basedatas;
        
        if(response.modal && !method){
            informations.interaction_token = interaction.token,
            informations.interaction_id = interaction.id
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
                if(data.requestStatus === 204) return data
                const single = require("../structures/singles/message")
                let newData = new single(data, informations.bot)
                return newData
            }

            body.message_reference = utils.checks.checkReference(options.message_reference)
            body.embeds = utils.checks.checkEmbed(options.embeds)
            body.components = utils.checks.checkComponents(options.components)
            body.sticker_ids = utils.checks.checkStickers(options.sticker_ids)
            body.content = utils.checks.checkContent(options.content)
            if(response.ephemeral === true) body.flags = 64

            let checkfiles = utils.checks.checkFiles(options.files)
            if(checkfiles && Array.isArray(checkfiles) === true && checkfiles[0]){
                const FormData = require("form-data")
                let body_files = new FormData()
                for(const file in checkfiles){
                    body_files.append(`files[${file}]`, checkfiles[file].buffer, `${checkfiles[file].name}.${checkfiles[file].extension}`);
                }
                
                if(method !== "PATCH") body_files.append("payload_json", JSON.stringify({type: 4, data: body}));
                else body_files.append("payload_json", JSON.stringify(body));
            
                passedOptions.boundary = body_files.getBoundary()
                let args = [
                    {value: body_files, data_name: "options", stringified: false, order: 3}
                ]

                basedatas = handler(args, passedOptions, callBackSuccess)
            }else if(!body.content && body.embeds.length === 0 && body.components.length === 0 && body.sticker_ids.length === 0) return reject(createError("An error happened", {code: errors["74"].code, message: errors["74"].message, file: "Interaction"}))
            
            if(!checkfiles || !Array.isArray(checkfiles) === true || !checkfiles[0]) {
                let args = []

                if(method === "PATCH") args.push({value: body, data_name: "options"})
                else if (method) args.push({value: {type: 4, data: body}, data_name: "options"})

                basedatas = handler(args, passedOptions, callBackSuccess)
            }

            basedatas
            .then(answer => resolve(answer))
            .catch(err => reject(err))
        }
    })
}
module.exports.modifyreply = async (informations, interaction, response) => {
    if(!informations.application_id) informations.application_id = (await getBotId(informations.bot))

    informations.application_id = informations.id
    informations.interaction_token = interaction.token
    informations.id = interaction.id
    informations.method = apiPath.modify.reponse.method
    informations.path = apiPath.modify.reponse.url

    return this.reply(informations, interaction, response)
}
module.exports.deletereply = async (informations, interaction) => {
    return new Promise(async (resolve, reject) => {
        if(!interaction.id) return reject(utils.general.createError("An error happened", {code: errors["45"].code, message: errors["45"].message, file: "Interaction"}))
        if(!interaction.token) return reject(utils.general.createError("An error happened", {code: errors["45"].code, message: errors["45"].message, file: "Interaction"}))
    
        if(!informations.application_id) informations.application_id = (await getBotId(informations.bot))

        informations.application_id = informations.id
        informations.interaction_token = interaction.token
        informations.id = interaction.id
        
        let args = []
        let passedOptions = {
            method: apiPath.delete.reponse.method,
            token: informations.botToken,
            url: apiPath.delete.reponse.url,
            urlIDS: informations
        }

        handler(args, passedOptions, null)
        .catch(err => reject(err))
        .then(datas => resolve(datas))
    })
}

module.exports.getcommands = async (informations, cmdId) => {
    if(!informations.application_id) informations.application_id = (await getBotId(informations.bot))
    let passedOptions = {
        method: commandApiPath.get.global.method,
        token: informations.botToken,
        url: commandApiPath.get.global.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const ApplicationCommand = require("../structures/applicationscommands/command")
        const ApplicationCommandManager = require("../structures/managers/applicationcommands")
        if(cmdId){
            if(data.find(com => com.id === cmdId)) return new ApplicationCommand(data.find(com => com.id === cmdId), informations.bot)
            else return reject("No command found")
        }else{
            const commands = new ApplicationCommandManager(informations.bot)
            commands._addMultiple(data)
            return commands
        }
    }
    return handler(args, passedOptions, callBackSuccess)
}
module.exports.deletecommand = async (informations) => {
    if(!informations.application_id) informations.application_id = (await getBotId(informations.bot))
    let passedOptions = {
        method: commandApiPath.get.global.method,
        token: informations.botToken,
        url: commandApiPath.get.global.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}
module.exports.createcommand = async (informations, options) => {
    if(!informations.application_id) informations.application_id = (await getBotId(informations.bot))
    let check = checkApplicationCommand(options)
    if(!check.status) return reject(check)
    
    let passedOptions = {
        method: commandApiPath.create.global.method,
        token: informations.botToken,
        url: commandApiPath.create.global.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}
module.exports.modifycommand = async (informations, options) => {
    if(!informations.application_id) informations.application_id = (await getBotId(informations.bot))
    let check = checkApplicationCommand(options)
    if(!check.status) return reject(check)
    
    let passedOptions = {
        method: commandApiPath.modify.method,
        token: informations.botToken,
        url: commandApiPath.modify.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

async function getBotId(bot){
    let informations = {
        bot,
        botToken: bot.token
    }
    let request = await getMe(informations).catch(err => {})
    return request?.id
}