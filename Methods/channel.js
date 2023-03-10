const verify = require("../Utils/verify")

/**
 * 
 * @param {string} token 
 * @param {string} channelid 
 * @param {object} options 
 * @param {object} bot 
 * @returns 
 */
module.exports.modify = (token, channelid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order: 1}, {value: channelid, value_data: "id", data_name: "channelid", order: 2}, {value: options, data_name: "options", order: 3}, {value: bot, data_name: "bot", order: 4}], "PATCH", `channels/${channelid}`, this.modify, "modify channel")
        .then(datas => resolve(new (require(`../Gestionnaires/Individual/Channels_/Channel_${datas.type}`))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} channelid 
 * @param {object[]} ids 
 * @param {object} bot 
 * @returns 
 */
module.exports.bulkdelete = (token, channelid, ids, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order: 1}, {value: channelid, value_data: "id", data_name: "channelid", order: 2}, {value: {messages: ids}, data_name: "options"}, {value: ids, type: "array", data_name: "ids", order: 3}, {value: bot, data_name: "bot", order: 4}], "POST", `channels/${channelid}/messages/bulk-delete`, this.bulkdelete, "bulkdelete channel")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} channelid 
 * @param {object} bot 
 * @returns 
 */

module.exports.getinvites = (token, channelid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order: 1}, {value: channelid, value_data: "id", data_name: "channelid", order: 2}, {value: bot, data_name: "bot", order: 3}], "GET", `channels/${channelid}/invites`, this.getinvites, "getinvites channel")
        .then(datas => {
            const invites = new (require("../Gestionnaires/Multiple/Invites"))(bot)
            invites.__addMultiple(datas.map(da => { return {...da, token: token}}))
            return resolve(invites)
        })
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string*} channelid 
 * @param {object} bot 
 * @returns 
 */
module.exports.createinvite = (token, channelid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: bot, data_name: "bot", order: 3}, {value: {}, data_name: "options"}], "POST", `channels/${channelid}/invites`, this.createinvite, "createinvite channel")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Invite")({...datas, token: token}, bot))))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} channelid 
 * @param {object} newoverwrite 
 * @param {object} bot 
 * @returns 
 */
module.exports.editpermissions = (token, channelid, newoverwrite, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: newoverwrite, value_data: "newoverwrite", type: "array", data_name: "options", order:3}, {value: bot, data_name: "bot", order: 4}], "PUT", `channels/${channelid}/permissions/${newoverwrite.id}`, this.editpermissions, "editpermissions channel")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} channelid 
 * @param {object} newoverwrite 
 * @param {object} bot 
 * @returns 
 */
module.exports.deletepermission = (token, channelid, overwrite, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: overwrite, value_data: "overwrite", type: "array", data_name: "options", order:3}, {value: bot, data_name: "bot", order: 4}], "DELETE", `channels/${channelid}/permissions/${overwrite.id}`, this.deletepermission, "deletepermission channel")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} channelid 
 * @param {string} targetid 
 * @param {object} bot 
 * @returns 
 */
module.exports.follownews = (token, channelid, targetid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: targetid, value_data: "id", data_name: "targetid", order:3}, {value: {webhook_channel_id: targetid}, data_name: "options"}, {value: bot, data_name: "bot", order: 4}], "POST", `channels/${channelid}/followers`, this.follownews, "follownews channel")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} channelid 
 * @param {object} bot 
 * @returns 
 */
module.exports.getpins = (token, channelid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: bot, data_name: "bot", order: 3}], "POST", `channels/${channelid}/pins`, this.getpins, "getpins channel")
        .then(datas => {
            const messages = new (require("../Gestionnaires/Multiple/Messages"))(bot)
            messages.__addMultiple(datas.map(da => { return {...da, token: token}}))
            return resolve(datas)
        })
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} channelid 
 * @param {object} bot 
 * @returns 
 */
module.exports.triggertyping = (token, channelid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: bot, data_name: "bot", order: 3}], "POST", `channels/${channelid}/typing`, this.triggertyping, "triggertyping channel")
        .then(datas => {
            const messages = new (require("../Gestionnaires/Multiple/Messages"))(bot)
            messages.__addMultiple(datas.map(da => { return {...da, token: token}}))
            return resolve(datas)
        })
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {object} options 
 * @param {object} bot 
 * @returns 
 */
module.exports.create = (token, guildid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: options, value_data: "options", data_name: "options", order:3}, {value: bot, data_name: "bot", order: 4}], "POST", `guilds/${guildid}`, this.create, "create channel")
        .then(datas => resolve(new (require(`../Gestionnaires/Individual/Channels_/Channel_${datas.type}`)({...datas, token: token, guildid: guildid}, bot))))
        .catch(err => reject(err))
    })
}