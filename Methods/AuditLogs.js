module.exports = async (token, guildid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "AuditLogs"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "AuditLogs"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "AuditLogs"})
        const url = `${baseurl}/guilds/${guildid}/audit-logs`
        const basedatas = await fetch(url, {method: "GET", headers: baseheaders}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this(token, guildid)
                    .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - auditlogs 1")
                    er.content = err
                    reject(er)
                })
                    .then(datas => { return resolve(datas)})
                }, datas.retry_after * 1000)
            }else{
                    let er = new Error("Une erreur s'est produite lors de la requête - auditlogs 2")
                    er.content = datas
                    return reject(er)
            }
        }
        else{
            const transformac_type = {
                "GUILD_UPDATE":	1,
                "CHANNEL_CREATE":	10,
                "CHANNEL_UPDATE":	11,
                "CHANNEL_DELETE":	12,
                "CHANNEL_OVERWRITE_CREATE":	13,
                "CHANNEL_OVERWRITE_UPDATE":	14,
                "CHANNEL_OVERWRITE_DELETE":	15,
                "MEMBER_KICK":	20,
                "MEMBER_PRUNE":	21,
                "MEMBER_BAN_ADD":	22,
                "MEMBER_BAN_REMOVE":	23,
                "MEMBER_UPDATE":	24,
                "MEMBER_ROLE_UPDATE":	25,
                "MEMBER_MOVE":	26,
                "MEMBER_DISCONNECT":	27,
                "BOT_ADD":	28,
                "ROLE_CREATE":	30,
                "ROLE_UPDATE":	31,
                "ROLE_DELETE":	32,
                "INVITE_CREATE":	40,
                "INVITE_UPDATE":	41,
                "INVITE_DELETE":	42,
                "WEBHOOK_CREATE":	50,
                "WEBHOOK_UPDATE":	51,
                "WEBHOOK_DELETE":	52,
                "EMOJI_CREATE":	60,
                "EMOJI_UPDATE":	61,
                "EMOJI_DELETE":	62,
                "MESSAGE_DELETE":	72,
                "MESSAGE_BULK_DELETE":	73,
                "MESSAGE_PIN":	74,
                "MESSAGE_UNPIN":	75,
                "INTEGRATION_CREATE":	80,
                "INTEGRATION_UPDATE":	81,
                "INTEGRATION_DELETE":	82,
                "STAGE_INSTANCE_CREATE":	83,
                "STAGE_INSTANCE_UPDATE":	84,
                "STAGE_INSTANCE_DELETE":	85,
                "STICKER_CREATE":	90,
                "STICKER_UPDATE":	91,
                "STICKER_DELETE":	92,
                "GUILD_emploi_du_tempsD_EVENT_CREATE":	100,
                "GUILD_emploi_du_tempsD_EVENT_UPDATE":	101,
                "GUILD_emploi_du_tempsD_EVENT_DELETE":	102,
                "THREAD_CREATE":	110,
                "THREAD_UPDATE":	111,
                "THREAD_DELETE":	112
            }

            const final = datas.audit_log_entries.map(each => {return {ID: each.id, Executor: each.user_id, Target: each.target_id, Changes: each.changes, Options: each.options, Action: Object.entries(transformac_type).find(e => e[1] === each.action_type)}})

            return resolve(final)
        }
    })
}