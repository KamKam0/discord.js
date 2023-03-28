const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/event")

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
        const single = require("../structures/singles/event")
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
        const single = require("../structures/singles/event")
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

module.exports.getusers = (informations) => {
    let passedOptions = {
        method: apiPath.get.users.method,
        token: informations.botToken,
        url: apiPath.get.users.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const MemberClass = require("../structures/singles/member")
        const UsersClass = require("../structures/singles/user")
        let returnedData = data.filter(element => element.user).map(element => {
            if(element.user) element.user = new UsersClass({...element.user, guild_id: informations.guild_id}, informations.bot)
            if(element.member) element.member = new MemberClass({...element.member, guild_id: informations.guild_id}, informations.bot)
            return element
        })
        return returnedData
    }
    return handler(args, passedOptions, callBackSuccess)
}