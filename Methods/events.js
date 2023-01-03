const verify = require("../Utils/verify")

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
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: options, data_name: "options", order:3}, {value: bot, data_name: "bot", order: 4}], "POST", `guilds/${guildid}/scheduled-events`, this.create, "create event")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Event"))({...datas, guild_id: guildid, token: token}, bot)))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {string} eventid 
 * @param {object} options 
 * @param {object} bot 
 * @returns 
 */
module.exports.modify = (token, guildid, eventid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: eventid, value_data: "id", data_name: "eventid", order: 3}, {value: options, data_name: "options", order: 4}, {value: bot, data_name: "bot", order: 5}], "PATCH", `guilds/${guildid}/scheduled-events/${eventid}`, this.modify, "modify event")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Event"))({...datas, guild_id: guildid, token: token}, bot)))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {string} eventid 
 * @param {object} bot 
 * @returns 
 */
module.exports.delete = (token, guildid, eventid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: eventid, value_data: "id", data_name: "eventid", order: 3}, {value: bot, data_name: "bot", order: 4}], "DELETE", `guilds/${guildid}/scheduled-events/${eventid}`, this.delete, "delete event")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}