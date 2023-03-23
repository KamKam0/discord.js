const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/threads")

module.exports.create_withoutm = async (informations, options) => {
    let passedOptions = {
        method: apiPath.create.withoutMessage.method,
        token: informations.botToken,
        url: apiPath.create.withoutMessage.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/channels/channelguildpublicthread")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.create_withm = async (informations, options) => {
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
        const single = require("../structures/singles/channels/channelguildpublicthread")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.jointhread = async (informations) => {
    let passedOptions = {
        method: apiPath.join.method,
        token: informations.botToken,
        url: apiPath.join.url,
        urlIDS: informations
    }
    let args = []
    return handler(args, passedOptions, null)
}

module.exports.addthreadmember = async (informations) => {
    let passedOptions = {
        method: apiPath.add.method,
        token: informations.botToken,
        url: apiPath.add.url,
        urlIDS: informations
    }
    let args = []
    return handler(args, passedOptions, null)
}

module.exports.leavethread = async (informations) => {
    let passedOptions = {
        method: apiPath.leave.method,
        token: informations.botToken,
        url: apiPath.leave.url,
        urlIDS: informations
    }
    let args = []
    return handler(args, passedOptions, null)
}

module.exports.removethreadmember = async (informations) => {
    let passedOptions = {
        method: apiPath.remove.method,
        token: informations.botToken,
        url: apiPath.remove.url,
        urlIDS: informations
    }
    let args = []
    return handler(args, passedOptions, null)
}

module.exports.create_tforum = (token, channelid, options, bot) => {
    let passedOptions = {
        method: apiPath.create.forum.method,
        token: informations.botToken,
        url: apiPath.create.forum.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/channels/channelguildpublicthread")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.getthreadmember = async (informations, withm, limit, after) => {
    let passedOptions = {
        method: apiPath.get.member.method,
        token: informations.botToken,
        url: apiPath.get.member.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3},
        {value: withm, required: false, check: false, type: "boolean", order: 4}, 
        {value: limit, required: false, check: false, type: "number", order: 5}, 
        {value: after, check: false, required: false, value_data: "id", order: 6}, 
        {
            value: {
                with_member: withm, after, limit
            }, 
            data_name: "infosURL",
            required: false,  
            check: [
                {name: "with_member", type: "boolean"}, 
                {name: "after", type: "string", data_type: "id"}, 
                {name: "limit", type: "number", limit: 100}
            ]
        }
    ]
    let callBackSuccess = function (data){
        let guild = informations.bot.guilds.get(informations.bot.channels.get(informations.thread_id).guild_id)
        let member;
        if(guild) member = guild.members.get(informations.member_id)
        if(member) data.member = member
        data.user = informations.bot.users.get(data.user_id)
        return data
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.getthreadmembers = async (informations, withm, limit, after) => {
    let passedOptions = {
        method: apiPath.get.members.method,
        token: informations.botToken,
        url: apiPath.get.members.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3},
        {value: withm, required: false, check: false, type: "boolean", order: 4}, 
        {value: limit, required: false, check: false, type: "number", order: 5}, 
        {value: after, check: false, required: false, value_data: "id", order: 6}, 
        {
            value: {
                with_member: withm, after, limit
            }, 
            data_name: "infosURL",
            required: false,  
            check: [
                {name: "with_member", type: "boolean"}, 
                {name: "after", type: "string", data_type: "id"}, 
                {name: "limit", type: "number", limit: 100}
            ]
        }
    ]
    let callBackSuccess = function (data){
        let guild = informations.bot.guilds.get(informations.bot.channels.get(informations.thread_id).guild_id)
        data.map(e => {
            let member;
            if(guild) member = guild.members.get(e.user_id)
            if(member) e.member = member
            e.user = informations.bot.users.get(e.user_id)
            return member
        })
        return data
    }
    return handler(args, passedOptions, callBackSuccess)
}