const verify = require("../Utils/verify")
/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {string} memberid 
 * @param {string} reason 
 * @param {object} bot 
 * @returns 
 */
module.exports.ban = async (token, guildid, memberid, reason, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order: 1}, {value: reason, data_name: "reason", order: 4, required: false}, {value: guildid, value_data: "id", data_name: "guildid", order: 2}, {value: memberid, value_data: "id", data_name: "memberid", order: 3}, {value: {delete_message_days: 0, reason: `${reason ? String(reason) : "No Reason Provided"}`}, data_name: "options"}, {value: bot, data_name: "bot", order: 5}], "put", `guilds/${guildid}/bans/${memberid}`, this.ban, "ban")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {string} memberid 
 * @param {object} bot 
 * @returns 
 */
module.exports.unban = async (token, guildid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order: 1}, {value: guildid, value_data: "id", data_name: "guildid", order: 2}, {value: memberid, value_data: "id", data_name: "memberid", order: 3}, {value: bot, data_name: "bot", order: 4}], "delete", `guilds/${guildid}/bans/${memberid}`, this.unban, "unban", "xww")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {object} bot 
 * @returns 
 */
module.exports.fetch = async (token, guildid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order: 1}, {value: guildid, value_data: "id", data_name: "guildid", order: 2}, {value: bot, data_name: "bot", order: 4}], "get", `guilds/${guildid}/bans`, this.fetch, "fetchbans")
        .then(datas => {
            const Bans = new (require("../Gestionnaires/Multiple/Bans"))(bot)
            Bans.__addMultiple(datas.map(da => { return {...da, guild_id: guildid, token: token}}))
            return resolve(Bans)
        })
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {string} memberid 
 * @param {object} bot 
 * @returns 
 */
module.exports.fetchspe = async (token, guildid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order: 1}, {value: guildid, value_data: "id", data_name: "guildid", order: 2}, {value: memberid, value_data: "id", data_name: "memberid", order: 3}, {value: bot, data_name: "bot", order: 4}], "get", `guilds/${guildid}/bans/${memberid}`, this.fetchspe, "fetchspebans")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Ban"))({...datas, guild_id: guildid, token: token}, bot)) )
        .catch(err => reject(err))
    })
}