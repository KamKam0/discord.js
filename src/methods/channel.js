const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/channel")
const inviteApiPath = require("../api/v10/invite")
let channelTypes = require("../types/channels")


module.exports.modify = (informations, options) => {
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
    let callBackSuccess = function (data){
        let textType = channelTypes.revert()[data.type]
        if(!textType && String(channelTypes.types[data.type]) !== "undefined") textType = data.type
        let channelClass = require(`../singles/channels/channel${String(textType).toLowerCase()}`)
        let newData = new channelClass(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}


module.exports.bulkdelete = (informations, options) => {
    let passedOptions = {
        method: apiPath.bulkDelete.method,
        token: informations.botToken,
        url: apiPath.bulkDelete.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", reason: true, required: false}
    ]
    return handler(args, passedOptions, null)
}

module.exports.getinvites = (informations) => {
    let passedOptions = {
        method: apiPath.invites.getInvites.method,
        token: informations.botToken,
        url: apiPath.invites.getInvites.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        data = data.map(da => {
            da.channel_id = da.channel.id
            return da
        })
        const manager = require("../structures/managers/invites")
        let newData = new manager(informations.bot)
        newData._addMultiple(data)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams] 
 * @param {boolean} [queryParams.with_counts]
 * @param {string} [queryParams.guild_scheduled_event_id] ID
 * @param {boolean} [queryParams.with_expiration] 
 * @returns 
 */
module.exports.getinvite = (informations, queryParams) => {
    let passedOptions = {
        method: inviteApiPath.get.method,
        token: informations.botToken,
        url: inviteApiPath.get.url,
        urlIDS: informations
    }
    let args = [
        {
            value: queryParams, 
            data_name: "infosURL",
            required: false,  
            check: [
                {name: "with_counts", type: "boolean"}, 
                {name: "guild_scheduled_event_id", type: "number", data_type: "id"}, 
                {name: "with_expiration", type: "boolean"}
            ]
        }
    ]
    let callBackSuccess = function (data){
        data.channel_id = data.channel.id
        data.guild_id = data.guild.id
        const single = require("../structures/singles/invite")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}


module.exports.deleteinvite = (informations, options) => {
    let passedOptions = {
        method: inviteApiPath.delete.method,
        token: informations.botToken,
        url: inviteApiPath.delete.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: false}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/invite")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}


module.exports.createinvite = (informations, options) => {
    let passedOptions = {
        method: apiPath.invites.createInvite.method,
        token: informations.botToken,
        url: apiPath.invites.createInvite.url,
        urlIDS: informations
    }
    let args = [
        {value: options || {}, data_name: "options"}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/invite")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}


module.exports.editpermissions = (informations, options) => {
    let passedOptions = {
        method: apiPath.permissions.editPermissions.method,
        token: informations.botToken,
        url: apiPath.permissions.editPermissions.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, value_data: "newoverwrite", type: "object", data_name: "options", order:3, reason: true, required: true}
    ]
    return handler(args, passedOptions, null)
}


module.exports.deletepermission = (informations, options) => {
    let passedOptions = {
        method: apiPath.permissions.deletePermissions.method,
        token: informations.botToken,
        url: apiPath.permissions.deletePermissions.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: false}
    ]
    return handler(args, passedOptions, null)
}

module.exports.follownews = (informations, targetid) => {
    let passedOptions = {
        method: apiPath.followNews.method,
        token: informations.botToken,
        url: apiPath.followNews.url,
        urlIDS: informations
    }
    let args = [
        {value: targetid, value_data: "id", data_name: "targetid", order:3}, 
        {value: {webhook_channel_id: targetid}, data_name: "options"}
    ]
    return handler(args, passedOptions, null)
}

module.exports.getpins = (informations) => {
    let passedOptions = {
        method: apiPath.getPins.method,
        token: informations.botToken,
        url: apiPath.getPins.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const manager = require("../structures/managers/messages")
        let newData = new manager(informations.bot)
        newData._addMultiple(data)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.triggertyping = (informations) => {
    let passedOptions = {
        method: apiPath.triggerTyping.method,
        token: informations.botToken,
        url: apiPath.triggerTyping.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}


module.exports.create = (informations, options) => {
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
    let callBackSuccess = function (data){
        let textType = channelTypes.revert()[data.type]
        if(!textType && String(channelTypes.types[data.type]) !== "undefined") textType = data.type
        let channelClass = require(`../singles/channels/channel${String(textType).toLowerCase()}`)
        let newData = new channelClass(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}


module.exports.delete = (informations, options) => {
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