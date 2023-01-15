module.exports = async (bot, datas) => {
    datas.action_type = Object.entries(require("../constants").autoditTransforms).find(e => e[1] === datas.action_type)
    datas.guild = bot.guilds.get(datas.guild_id)
    datas.user = bot.users.get(datas.user_id)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, datas)
}

function name(){ return "GUILD_AUDIT_LOG_ENTRY_CREATE" }