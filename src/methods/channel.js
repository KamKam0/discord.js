const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/channel")
let channelTypes = require("../types/channels")

module.exports.modify = (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.method,
        token: informations.botToken,
        url: apiPath.modify.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    let callBackSuccess = function (data){
        let textType = channelTypes.reverse()[data.type]
        const single = require(`../structures/singles/channel${textType.toLowerCase()}`)
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.bulkdelete = (informations, ids) => {
    let passedOptions = {
        method: apiPath.bulkDelete.method,
        token: informations.botToken,
        url: apiPath.bulkDelete.url,
        urlIDS: informations
    }
    let args = [
        {value: {messages: ids}, data_name: "options"}, 
        {value: ids, type: "array", data_name: "ids", order: 3}
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
        const manager = require("../structures/managers/invites")
        let newData = new manager(informations.bot)
        newData._addMultiple(data)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.createinvite = (informations) => {
    let passedOptions = {
        method: apiPath.invites.getInvites.method,
        token: informations.botToken,
        url: apiPath.invites.getInvites.url,
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

module.exports.editpermissions = (informations, newoverwrite) => {
    let passedOptions = {
        method: apiPath.permissions.editPermissions.method,
        token: informations.botToken,
        url: apiPath.permissions.editPermissions.url,
        urlIDS: informations
    }
    let args = [
        {value: newoverwrite, value_data: "newoverwrite", type: "array", data_name: "options", order:3}
    ]
    return handler(args, passedOptions, null)
}

module.exports.deletepermission = (informations) => {
    let passedOptions = {
        method: apiPath.permissions.deletePermissions.method,
        token: informations.botToken,
        url: apiPath.permissions.deletePermissions.url,
        urlIDS: informations
    }
    let args = [ ]
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
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    let callBackSuccess = function (data){
        let textType = channelTypes.reverse()[data.type]
        const single = require(`../structures/singles/channel${textType.toLowerCase()}`)
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}