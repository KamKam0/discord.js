const verify = require("../Utils/verify")

/**
 * 
 * @param {string} token 
 * @param {string} channelid 
 * @param {object} options 
 * @param {object} bot 
 * @returns 
 */
module.exports.create_withoutm = async (token, channelid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: options, data_name: "options", order: 3}, {value: bot, data_name: "bot", order: 4}], "POST", `channels/${channelid}/threads`, this.create_withoutm, "create_withoutm threads")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Channels_/Channel_11"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} channelid 
 * @param {string} messageid 
 * @param {object} options 
 * @param {object} bot 
 * @returns 
 */
module.exports.create_withm = async (token, channelid, messageid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: messageid, value_data: "id", data_name: "messageid", order:3}, {value: options, data_name: "options", order: 4}, {value: bot, data_name: "bot", order: 5}], "POST", `channels/${channelid}/messages/${messageid}/threads`, this.create_withm, "create_withm threads")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/ThChannels_/Channel_11read"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} threadid 
 * @param {object} bot 
 * @returns 
 */
module.exports.jointhread = async (token, threadid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: threadid, value_data: "id", data_name: "threadid", order:2}, {value: bot, data_name: "bot", order: 3}], "PUT", `channels/${threadid}/thread-members/@me`, this.jointhread, "jointhread threads")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} threadid 
 * @param {string} memberid 
 * @param {object} bot 
 * @returns 
 */
module.exports.addthreadmember = async (token, threadid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: threadid, value_data: "id", data_name: "threadid", order:2}, {value: memberid, value_data: "id", data_name: "memberid", order:3}, {value: bot, data_name: "bot", order: 4}], "PUT", `channels/${threadid}/thread-members/${memberid}`, this.addthreadmember, "addthreadmember threads")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} threadid 
 * @param {object} bot 
 * @returns 
 */
module.exports.leavethread = async (token, threadid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: threadid, value_data: "id", data_name: "threadid", order:2}, {value: bot, data_name: "bot", order: 3}], "DELETE", `channels/${threadid}/thread-members/@me`, this.leavethread, "leavethread threads")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} threadid 
 * @param {string} memberid 
 * @param {object} bot 
 * @returns 
 */
module.exports.removethreadmember = async (token, threadid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: threadid, value_data: "id", data_name: "threadid", order:2}, {value: memberid, value_data: "id", data_name: "memberid", order:3}, {value: bot, data_name: "bot", order: 4}], "DELETE", `channels/${threadid}/thread-members/${memberid}`, this.removethreadmember, "removethreadmember threads")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} channelid 
 * @param {object} options 
 * @param {object} bot 
 * @returns 
 */
module.exports.create_tforum = (token, channelid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: threadid, value_data: "id", data_name: "threadid", order:2}, {value: options, data_name: "options", order:3}, {value: bot, data_name: "bot", order: 4}], "POST", `channels/${channelid}/threads`, this.create_tforum, "create_tforum threads")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Channels_/Channel_11"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} threadid 
 * @param {string} memberid 
 * @param {boolean} withm 
 * @param {number} limit 
 * @param {string} after 
 * @param {object} bot 
 * @returns 
 */
module.exports.getthreadmember = async (token, threadid, memberid, withm, limit, after, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: threadid, value_data: "id", data_name: "threadid", order:2}, {value: memberid, value_data: "id", data_name: "memberid", order:3}, {value: withm, required: false, check: false, type: "boolean", order: 4}, {value: limit, required: false, check: false, type: "number", order: 5}, {value: after, check: false, required: false, value_data: "id", order: 6}, {value: bot, data_name: "bot", order: 7}, {value: {with_member: withm, after, limit}, data_name: "infosURL",required: false,  check: [{name: "with_member", type: "boolean"}, {name: "after", type: "string", data_type: "id"}, {name: "limit", type: "number", limit: 100}]}], "GET", `channels/${threadid}/thread-members/${memberid}`, this.getthreadmember, "getthreadmember threads")
        .then(datas => {
            let guild = bot.guilds.get(bot.channels.get(threadid).guild_id)
            let member;
            if(guild) member = guild.members.get(memberid)
            if(member) datas.member = member
            datas.user = bot.users.get(datas.user_id)
            resolve(datas)
        })
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} threadid 
 * @param {boolean} withm 
 * @param {number} limit 
 * @param {string} after 
 * @param {object} bot 
 * @returns 
 */
module.exports.getthreadmembers = async (token, threadid, withm, limit, after, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: threadid, value_data: "id", data_name: "threadid", order:2}, {value: withm, required: false, check: false, type: "boolean", order: 4}, {value: limit, required: false, check: false, type: "number", order: 5}, {value: after, check: false, required: false, value_data: "id", order: 6}, {value: bot, data_name: "bot", order: 7}, {value: {with_member: withm, after, limit}, data_name: "infosURL",required: false,  check: [{name: "with_member", type: "boolean"}, {name: "after", type: "string", data_type: "id"}, {name: "limit", type: "number", limit: 100}]}], "GET", `channels/${threadid}/thread-members`, this.getthreadmembers, "getthreadmembers threads")
        .then(datas => {
            let guild = bot.guilds.get(bot.channels.get(threadid).guild_id)
            datas.map(e => {
                let member;
                if(guild) member = guild.members.get(e.user_id)
                if(member) e.member = member
                e.user = bot.users.get(e.user_id)
                return member
            })
            resolve(datas)
        })
        .catch(err => reject(err))
    })
}