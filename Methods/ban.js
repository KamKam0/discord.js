module.exports.ban = async (token, guildid, memberid, reason) => {
    return new Promise(async (resolve, reject) => {
        require("../Utils/verify")([{value: token, type: "string", data_name: "token", required: true}, {value: reason, type: "string", data_name: "reason", required: true}, {value: guildid, value_data: "id", type: "string", data_name: "guildid", required: true}, {value: memberid, value_data: "id", type: "string", data_name: "memberid", required: true}, {value: {delete_message_days: 0, reason: `${reason ? String(reason) : "No Reason Provided"}`}, type: "object", data_name: "options", required: true}], "put", `guilds/${guildid}/bans/${memberid}`, this.ban, "ban")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

module.exports.unban = async (token, guildid, memberid) => {
    return new Promise(async (resolve, reject) => {
        require("../Utils/verify")([{value: token, type: "string", data_name: "token", required: true}, {value: reason, type: "string", data_name: "reason", required: true}, {value: guildid, value_data: "id", type: "string", data_name: "guildid", required: true}, {value: memberid, value_data: "id", type: "string", data_name: "memberid", required: true}, {value: {delete_message_days: 0, reason: `${reason ? String(reason) : "No Reason Provided"}`}, type: "object", data_name: "options", required: true}], "delete", `guilds/${guildid}/bans/${memberid}`, this.unban, "unban", "xww")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

module.exports.fetch = async (token, guildid) => {
    return new Promise(async (resolve, reject) => {
        require("../Utils/verify")([{value: token, type: "string", data_name: "token", required: true}, {value: guildid, value_data: "id", type: "string", data_name: "guildid", required: true}], "get", `guilds/${guildid}/bans`, this.fetch, "fetchbans")
        .then(datas => {
            const Bans = new (require("../../Gestionnaires/Multiple/Bans"))(guildid)
            Bans.AddBans(datas.map(da => { return {...da, token: token}}))
            return resolve(Bans)
        })
        .catch(err => reject(err))
    })
}

module.exports.fetchspe = async (token, guildid, memberid) => {
    return new Promise(async (resolve, reject) => {
        require("../Utils/verify")([{value: token, type: "string", data_name: "token", required: true}, {value: guildid, value_data: "id", type: "string", data_name: "guildid", required: true}, {value: memberid, value_data: "id", type: "string", data_name: "memberid", required: true}], "get", `guilds/${guildid}/bans/${memberid}`, this.fetchspe, "fetchspebans")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Ban"))({...datas, guild_id: guildid, token: token})) )
        .catch(err => reject(err))
    })
}