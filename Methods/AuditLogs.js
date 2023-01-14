const Threads = require("../Gestionnaires/Multiple/Channels")
const Users = require("../Gestionnaires/Multiple/Users")
const Integrations = require("../Gestionnaires/Multiple/Integrations")
const Webhooks = require("../Gestionnaires/Multiple/Webhooks")
const Events = require("../Gestionnaires/Multiple/Events")
const ApplicationCommands = require("../Gestionnaires/Multiple/Commands")
/**
 * 
 * @param {string} token 
 * @param {string} guildid 
 * @param {object} bot 
 * @returns
 */
module.exports = async (token, guildid, infosURL, bot) => {
    return new Promise(async (resolve, reject) => {
        require("../Utils/verify")([{value: token, data_name: "token", order: 1}, {value: guildid, value_data: "id", data_name: "guildid", order: 2}, {value: infosURL, data_name: "infosURL", order: 3, required: false, check: [{name: "user_id", type: "string", data_type: "id"}, {name: "after", type: "string", data_type: "id"}, {name: "before", type: "string", data_type: "id"}, {name: "limit", type: "number", limit: 100}, {name: "action_type", type: "number", filter: Object.values(require("../constants").autoditTransforms).includes(infosURL?.action_type)}]}, {value: bot, data_name: "bot", order: 4}], "get", `guilds/${guildid}/audit-logs`, this, "audit-logs")
        .then(datas => {
            let transformac_type = require("../constants").autoditTransforms
            datas.audit_log_entries = datas.audit_log_entries.map(each => {return {...each, action_type: Object.entries(transformac_type).find(e => e[1] === each.action_type)}})
            datas.threads = (new Threads(bot)).__AddChannels(datas.threads)
            datas.users = (new Users(bot)).__AddUsers(datas.users)
            datas.integrations = (new Integrations(bot)).__AddIntegrations(datas.integrations)
            datas.webhooks = (new Webhooks(bot)).__AddWebhooks(datas.webhooks)
            datas.guild_scheduled_events = (new Events(bot)).__AddEvents(datas.guild_scheduled_events)
            datas.application_commands = (new ApplicationCommands(bot)).__AddCommands(datas.application_commands)
            datas.auto_moderation_rules = datas.auto_moderation_rules.map(us => us)
            return resolve(datas)
        })
        .catch(err => reject(err))
    })
}