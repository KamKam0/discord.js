const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/threads")


module.exports.create_withoutm = async (informations, options) => {
    let passedOptions = {
        method: apiPath.create.withoutMessage.method,
        token: informations.botToken,
        url: apiPath.create.withoutMessage.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: true}
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
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: true}
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


module.exports.create_tforum = (informations, options) => {
    let passedOptions = {
        method: apiPath.create.forum.method,
        token: informations.botToken,
        url: apiPath.create.forum.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: true}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/channels/channelguildpublicthread")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams] 
 * @param {boolean} [queryParams.with_member]
 * @returns 
 */
module.exports.getthreadmember = async (informations, queryParams) => {
    let passedOptions = {
        method: apiPath.get.member.method,
        token: informations.botToken,
        url: apiPath.get.member.url,
        urlIDS: informations
    }
    let args = [
        {
            value: queryParams, 
            data_name: "infosURL",
            required: false,  
            check: [
                {name: "with_member", type: "boolean"}
            ]
        }
    ]
    let callBackSuccess = function (data){
        let guild = informations.bot.guilds.get(informations.guild_id)
        let member;
        if(guild) member = guild.members.get(informations.user_id)
        if(member) data.member = member
        data.user = informations.bot.users.get(data.user_id)
        return data
    }
    return handler(args, passedOptions, callBackSuccess)
}

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams] 
 * @param {string} [queryParams.before] ID
 * @param {string} [queryParams.after] ID
 * @param {number} [queryParams.limit] 
 * @returns 
 */
module.exports.getthreadmembers = async (informations, queryParams) => {
    let passedOptions = {
        method: apiPath.get.members.method,
        token: informations.botToken,
        url: apiPath.get.members.url,
        urlIDS: informations
    }
    let args = [
        {
            value: queryParams, 
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
        let guild = informations.bot.guilds.get(informations.guild_id)
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

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams] 
 * @param {string} [queryParams.before] ID
 * @param {number} [queryParams.limit] 
 * @returns 
 */
module.exports.getpublicarchived = async (informations, queryParams) => {
    return getThreads(informations, apiPath.get.publicsArchived.method, apiPath.get.publicsArchived.url, queryParams)
}

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams] 
 * @param {string} [queryParams.before] ID
 * @param {number} [queryParams.limit] 
 * @returns 
 */
module.exports.getprivatearchived = async (informations, queryParams) => {
    return getThreads(informations, apiPath.get.privatesArchived.method, apiPath.get.privatesArchived.url, queryParams)
}

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams] 
 * @param {string} [queryParams.before] ID
 * @param {number} [queryParams.limit] 
 * @returns 
 */
module.exports.getprivatejoined = async (informations, queryParams) => {
    return getThreads(informations, apiPath.get.privatesJoinedArchived.method, apiPath.get.privatesJoinedArchived.url, queryParams)
}

async function getThreads(informations, method, url, queryParams){
    let passedOptions = {
        method,
        token: informations.botToken,
        url,
        urlIDS: informations
    }
    let args = [
        {
            value: queryParams, 
            data_name: "infosURL",
            required: false,  
            check: [
                {name: "before", type: "string", data_type: "id"}, 
                {name: "limit", type: "number", limit: 100}
            ]
        }
    ]
    let callBackSuccess = function (data){
        let guild = informations.bot.guilds.get(informations.guild_id)
        if(guild){
            const threadManager = require("../structures/managers/channels")
            const memberManager = require("../structures/managers/members")
            let threads = new threadManager(informations.bot, informations.guild_id)
            let members = new memberManager(informations.bot, informations.guild_id)
            threads._addMultiple(data.threads)
            members._addMultiple(data.members)

            data.threads = threads
            data.members = members
        }
        return data
    }
    return handler(args, passedOptions, callBackSuccess)
}