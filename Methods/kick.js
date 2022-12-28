const verify = require("../Utils/verify")
module.exports = async (token, guildid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: memberid, value_data: "id", data_name: "memberid", order:3}, {value: bot, type: "object", data_name: "bot", order: 4}], "DELETE", `guilds/${guildid}/members/${memberid}`, this, "kick")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}