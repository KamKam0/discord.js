const verify = require("../Utils/verify")
module.exports = async (token, guildid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: guildid, value_data: "id", type: "string", data_name: "guildid"}, {value: memberid, value_data: "id", type: "string", data_name: "memberid"}], "DELETE", `guilds/${guildid}/members/${memberid}`, this, "kick")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}