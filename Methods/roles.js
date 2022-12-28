const verify = require("../Utils/verify")
module.exports.add = async (token, guildid, roleid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: roleid, value_data: "id", data_name: "roleid", order:3}, {value: memberid, value_data: "id", data_name: "memberid", order:4}, {value: bot, data_name: "bot", order: 5}], "PUT", `guilds/${guildid}/members/${memberid}/roles/${roleid}`, this.add, "add role")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.remove = async (token, guildid, roleid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: roleid, value_data: "id", data_name: "roleid", order:3}, {value: memberid, value_data: "id", data_name: "memberid", order:4}, {value: bot, data_name: "bot", order: 5}], "DELETE", `guilds/${guildid}/members/${memberid}/roles/${roleid}`, this.remove, "remove role")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.delete = async (token, guildid, roleid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: roleid, value_data: "id", data_name: "roleid", order:3}, {value: bot, data_name: "bot", order: 4}], "DELETE", `guilds/${guildid}/roles/${roleid}`, this.delete, "delete role")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.create = async (token, guildid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: options, data_name: "options", order:3}, {value: bot, data_name: "bot", order: 4}], "POST", `guilds/${guildid}/roles`, this.create, "create role")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Role"))({...datas, token: token, guild_id: guildid}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.changepositions = async (token, guildid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: options, data_name: "options", order:3}, {value: bot, data_name: "bot", order: 4}], "PATCH", `guilds/${guildid}/roles`, this.changepositions, "changepositions role")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.modify = async (token, guildid, roleid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: roleid, value_data: "id", data_name: "roleid", order:3}, {value: options, data_name: "options", order:4}, {value: bot, data_name: "bot", order: 5}], "PATCH", `guilds/${guildid}/roles/${roleid}`, this.modify, "modify role")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Role"))({...datas, token: token, guild_id: guildid}, bot)))
        .catch(err => reject(err))
    })
}