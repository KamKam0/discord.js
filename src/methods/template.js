const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/template")

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
        const single = require("../structures/singles/template")
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
    let callBackSuccess = function (data){
        const single = require("../structures/singles/template")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.get = (informations) => {
    let passedOptions = {
        method: apiPath.getGuild.template.method,
        token: informations.botToken,
        url: apiPath.getGuild.template.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/template")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.getall = (informations) => {
    let passedOptions = {
        method: apiPath.getGuild.templates.method,
        token: informations.botToken,
        url: apiPath.getGuild.templates.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const multiple = require("../structures/managers/templates")
        let newData = new multiple(informations.bot)
        multiple._addMultiple(data)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.createguild = (informations, options) => {
    let passedOptions = {
        method: apiPath.create.fromTemplate.method,
        token: informations.botToken,
        url: apiPath.create.fromTemplate.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/guild")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.sync = (informations) => {
    let passedOptions = {
        method: apiPath.sync.method,
        token: informations.botToken,
        url: apiPath.sync.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/template")
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
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/template")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}