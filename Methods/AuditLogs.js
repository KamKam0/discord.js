module.exports = async (token, guildid, bot) => {
    return new Promise(async (resolve, reject) => {
        require("../Utils/verify")([{value: token, data_name: "token", order: 1}, {value: guildid, value_data: "id", data_name: "guildid", order: 2}, {value: bot, data_name: "bot", order: 3}], "get", `guilds/${guildid}/audit-logs`, this, "audit-logs")
        .then(datas => {
            let transformac_type = require("../constants").autoditTransforms

            const final = datas.audit_log_entries.map(each => {return {ID: each.id, Executor: each.user_id, Target: each.target_id, Changes: each.changes, Options: each.options, Action: Object.entries(transformac_type).find(e => e[1] === each.action_type)}})

            return resolve(final)
        })
        .catch(err => reject(err))
    })
}