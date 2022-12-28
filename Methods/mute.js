const verify = require("../Utils/verify")
module.exports.mute = async (token, guildid, memberid, time, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1},  {value: guildid, value_data: "id", data_name: "guildid", order:2},  {value: memberid, value_data: "id", data_name: "memberid", order:3},  {value: time, type: "number", data_name: "time", order:4}, {value: bot, data_name: "bot", order: 5}, {value: {communication_disabled_until: time}, data_name: "options"}], "PATCH", `guilds/${guildid}/members/${memberid}`, this.mute, "mute")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Member"))({...datas, token: token, guild_id: guildid}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.unmute = async (token, guildid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1},  {value: guildid, value_data: "id", data_name: "guildid", order:2},  {value: memberid, value_data: "id", data_name: "memberid", order:3}, {value: bot, data_name: "bot", order: 4}, {value: {communication_disabled_until: null}, data_name: "options"}], "PATCH", `guilds/${guildid}/members/${memberid}`, this.unmute, "unmute")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Member"))({...datas, token: token, guild_id: guildid}, bot)))
        .catch(err => reject(err))
    })
}