const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/guild")
const inviteApiPath = require("../api/v10/invite")
const memberApiPath = require("../api/v10/member")
const types = require("../types/audit").types

const Threads = require("../structures/managers/channels")
const Users = require("../structures/managers/users")
const Integrations = require("../structures/managers/integrations")
const Webhooks = require("../structures/managers/webhooks")
const Events = require("../structures/managers/events")
const ApplicationCommands = require("../structures/managers/applicationcommands")

module.exports.deleteinvite = async (informations) => {
    let passedOptions = {
        method: inviteApiPath.delete.method,
        token: informations.botToken,
        url: inviteApiPath.delete.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/invite")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}


module.exports.modify = (informations, options) => {
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
        const single = require("../structures/singles/guild")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.delete = (informations) => {
    let passedOptions = {
        method: apiPath.delete.method,
        token: informations.botToken,
        url: apiPath.delete.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.changechannelposition = (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.channelPosition.method,
        token: informations.botToken,
        url: apiPath.modify.channelPosition.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    return handler(args, passedOptions, null)
}

module.exports.addmember = (informations, options) => {
    let passedOptions = {
        method: apiPath.create.method,
        token: informations.botToken,
        url: apiPath.create.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    return handler(args, passedOptions, null)
}


module.exports.modifymember = (informations, options) => {
    let passedOptions = {
        method: memberApiPath.modify.method,
        token: informations.botToken,
        url: memberApiPath.modify.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/member")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}


module.exports.modifycurrentmember = (informations, options) => {
    let passedOptions = {
        method: memberApiPath.modify.current.method,
        token: informations.botToken,
        url: memberApiPath.modify.current.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true}
    ]
    return handler(args, passedOptions, null)
}


module.exports.prune = (informations, options) => {
    let passedOptions = {
        method: apiPath.create.prune.method,
        token: informations.botToken,
        url: apiPath.create.prune.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true}
    ]
    return handler(args, passedOptions, null)
}

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams]
 * @param {string} [queryParams.include_roles] array of IDS separated by ;
 * @param {number} [queryParams.days] 
 * @returns 
 */
module.exports.prunecount = (informations, queryParams) => {
    let passedOptions = {
        method: apiPath.get.pruneCount.method,
        token: informations.botToken,
        url: apiPath.get.pruneCount.url,
        urlIDS: informations
    }
    let args = [
        {
            value: queryParams, 
            data_name: "infosURL",
            required: false,
            check: [
                {name: "days", type: "number"}, 
                {name: "include_roles", type: "string"}, 
            ]
        }
    ]
    return handler(args, passedOptions, null)
}

module.exports.getinvites = (informations) => {
    let passedOptions = {
        method: apiPath.get.invites.method,
        token: informations.botToken,
        url: apiPath.get.invites.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const single = require("../structures/managers/invites")
        let newData = new single(informations.bot)
        newData._addMultiple(data)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.getintegrations = (informations) => {
    let passedOptions = {
        method: apiPath.get.integrations.method,
        token: informations.botToken,
        url: apiPath.get.integrations.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const single = require("../structures/managers/integrations")
        let newData = new single(informations.bot)
        newData._addMultiple(data)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}


module.exports.deleteintegration = (informations, options) => {
    let passedOptions = {
        method: apiPath.delete.integration.method,
        token: informations.botToken,
        url: apiPath.delete.integration.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true}
    ]
    return handler(args, passedOptions, null)
}

module.exports.getwidgetsttings = (informations) => {
    let passedOptions = {
        method: apiPath.get.widgetSettings.method,
        token: informations.botToken,
        url: apiPath.get.widgetSettings.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const single = require("../structures/eventresult/widgetsettings")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.getwidget = (informations) => {
    let passedOptions = {
        method: apiPath.get.widget.method,
        token: informations.botToken,
        url: apiPath.get.widget.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams]
 * @param {string} [queryParams.style]
 * @returns 
 */
module.exports.getwidgetpng = (informations) => {
    let passedOptions = {
        method: apiPath.get.widgetImage.method,
        token: informations.botToken,
        url: apiPath.get.widgetImage.url,
        urlIDS: informations
    }
    let args = [
        {
            value: queryParams, 
            data_name: "infosURL",
            required: false,
            check: [
                {name: "style", type: "string"}
            ]
        }
    ]
    return handler(args, passedOptions, null)
}


module.exports.modifywidget = (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.widget.method,
        token: informations.botToken,
        url: apiPath.modify.widget.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true}
    ]
    return handler(args, passedOptions, null)
}

module.exports.getvanity = (informations) => {
    let passedOptions = {
        method: apiPath.get.vanity.method,
        token: informations.botToken,
        url: apiPath.get.vanity.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.getwelcomescreen = (informations) => {
    let passedOptions = {
        method: apiPath.get.welcomeScreen.method,
        token: informations.botToken,
        url: apiPath.get.welcomeScreen.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}


module.exports.modifywelcomescreen = (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.welcomeScreen.method,
        token: informations.botToken,
        url: apiPath.modify.welcomeScreen.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true}
    ]
    return handler(args, passedOptions, null)
}

module.exports.modifyuservoice = (informations, channelId, suppress) => {
    let passedOptions = {
        method: apiPath.modify.userVoice.method,
        token: informations.botToken,
        url: apiPath.modify.userVoice.url,
        urlIDS: informations
    }
    let args = [
        {value: {
            channel_id: channelId,
            suppress
        }, data_name: "options", order: 3}
    ]
    return handler(args, passedOptions, null)
}

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams] 
 * @param {string} [queryParams.before] ID
 * @param {string} [queryParams.after] ID
 * @param {number} [queryParams.limit] 
 * @param {number} [queryParams.action_type] 
 * @param {string} [queryParams.user_id] ID
 * @returns 
 */
module.exports.fetchauditlogs = async (informations, queryParams) => {
    
    let passedOptions = {
        method: apiPath.get.logs.method,
        token: informations.botToken,
        url: apiPath.get.logs.url,
        urlIDS: informations
    }
    let args = [
        {
            value: queryParams, 
            data_name: "infosURL", 
            order: 3, 
            required: false, 
            check: [
                {name: "user_id", type: "string", data_type: "id"}, 
                {name: "after", type: "string", data_type: "id"}, 
                {name: "before", type: "string", data_type: "id"}, 
                {name: "limit", type: "number", limit: 100}, 
                {name: "action_type", type: "number", filter: Object.values(types).includes(queryParams?.action_type)}
            ]
        }
    ]
    let callBackSuccess = function (data){
        data.audit_log_entries = data.audit_log_entries.map(each => {return {...each, action_type: Object.entries(types).find(e => e[1] === each.action_type)}})
        if(data.threads) {
            let threads = new Threads(informations.bot)
            data.threads = threads._addMultiple(data.threads)
        }
        if(data.users){
            let users = new Users(informations.bot)
            data.users = users._addMultiple(data.users)
        }
        if(data.integrations){
            let integrations = new Integrations(informations.bot)
            data.integrations = integrations._addMultiple(data.integrations)
        }
        if(data.webhooks){
            let webhooks = new Webhooks(informations.bot)
            data.webhooks = webhooks._addMultiple(data.webhooks)
        }
        if(data.guild_scheduled_events){
            let events = new Events(informations.bot)
            data.guild_scheduled_events = events._addMultiple(data.guild_scheduled_events)
        }
        if(data.application_commands){
            let applicationcommands = new ApplicationCommands(informations.bot)
            data.application_commands = applicationcommands._addMultiple(data.application_commands)
        }
        if(data.auto_moderation_rules){
            data.auto_moderation_rules = data.auto_moderation_rules.map(us => us)
        }
        return data
    }
    return handler(args, passedOptions, callBackSuccess)
}


module.exports.mfalevel = (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.mfa.method,
        token: informations.botToken,
        url: apiPath.modify.mfa.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true}
    ]
    return handler(args, passedOptions, null)
}