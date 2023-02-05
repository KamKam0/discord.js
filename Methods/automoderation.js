const verify = require("../Utils/verify")
const AutoModeration = require("../Gestionnaires/Individual/AutoModeration")
const AutoModerations = require("../Gestionnaires/Multiple/AutoModerations")
module.exports.create = async (token, guildid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order: 1}, {value: guildid, value_data: "id", data_name: "guildid", order: 2}, {value: options, value_data: "options", data_name: "options", order: 3}, {value: bot, data_name: "bot", order: 4}], "POST", `/guilds/${guildid}/auto-moderation/rules`, this.create, "create automod")
        .then(datas => resolve(new AutoModeration(datas, bot)))
        .catch(err => reject(err))
    })
}
module.exports.getall = async (token, guildid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order: 1}, {value: guildid, value_data: "id", data_name: "guildid", order: 2}, {value: bot, data_name: "bot", order: 3}], "GET", `/guilds/${guildid}/auto-moderation/rules`, this.getall, "getall automod")
        .then(datas => resolve((new AutoModerations(bot)).__addMultiple(datas)))
        .catch(err => reject(err))
    })
}
module.exports.get = async (token, guildid, automodid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order: 1}, {value: guildid, value_data: "id", data_name: "guildid", order: 2}, {value: automodid, value_data: "id", data_name: "automodid", order: 3}, {value: bot, data_name: "bot", order: 4}], "GET", `/guilds/${guildid}/auto-moderation/rules/${automodid}`, this.get, "get automod")
        .then(datas => resolve(new AutoModeration(datas, bot)))
        .catch(err => reject(err))
    })
}
module.exports.modify = async (token, guildid, automodid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order: 1}, {value: guildid, value_data: "id", data_name: "guildid", order: 2}, {value: automodid, value_data: "id", data_name: "automodid", order: 3}, {value: options, value_data: "options", data_name: "options", order: 4}, {value: bot, data_name: "bot", order: 5}], "PATCH", `/guilds/${guildid}/auto-moderation/rules/${automodid}`, this.modify, "modify automod")
        .then(datas => resolve(new AutoModeration(datas, bot)))
        .catch(err => reject(err))
    })
}
module.exports.delete = async (token, guildid, automodid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order: 1}, {value: guildid, value_data: "id", data_name: "guildid", order: 2}, {value: automodid, value_data: "id", data_name: "automodid", order: 3}, {value: bot, data_name: "bot", order: 4}], "DELETE", `/guilds/${guildid}/auto-moderation/rules/${automodid}`, this.delete, "delete automod")
        .then(datas => resolve("Done successfully"))
        .catch(err => reject(err))
    })
}