const verify = require("../Utils/verify")
module.exports.create = (token, guildid, options) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: guildid, value_data: "id", type: "string", data_name: "guildid"}, {value: options, type: "object", data_name: "options"}], "POST", `guilds/${guildid}/scheduled-events`, this.create, "create event")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Event"))({...datas, guild_id: guildid, token: token})))
        .catch(err => reject(err))
    })
}
module.exports.modify = (token, guildid, eventid, options) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: guildid, value_data: "id", type: "string", data_name: "guildid"}, {value: eventid, value_data: "id", type: "string", data_name: "eventid"}, {value: options, type: "object", data_name: "options"}], "PATCH", `guilds/${guildid}/scheduled-events/${eventid}`, this.modify, "modify event")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Event"))({...datas, guild_id: guildid, token: token})))
        .catch(err => reject(err))
    })
}
module.exports.delete = (token, guildid, eventid) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: guildid, value_data: "id", type: "string", data_name: "guildid"}, {value: eventid, value_data: "id", type: "string", data_name: "eventid"}], "DELETE", `guilds/${guildid}/scheduled-events/${eventid}`, this.delete, "delete event")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}