module.exports = async (token, guildid) => {
    return new Promise(async (resolve, reject) => {
        require("../Utils/verify")([{value: token, type: "string", data_name: "token", required: true}, {value: guildid, value_data: "id", type: "string", data_name: "guildid", required: true}], "get", `guilds/${guildid}/audit-logs`, this, "audit-logs")
        .then(datas => {
            let transformac_type = require("../constants").autoditTransforms

            const final = datas.audit_log_entries.map(each => {return {ID: each.id, Executor: each.user_id, Target: each.target_id, Changes: each.changes, Options: each.options, Action: Object.entries(transformac_type).find(e => e[1] === each.action_type)}})

            return resolve(final)
        })
        .catch(err => reject(err))
    })
}