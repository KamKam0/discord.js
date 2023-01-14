module.exports = async (bot, datas) => {
    datas.guild = bot.guilds.get(datas.guild_id)
    datas.channel = bot.channels.get(datas.channel_id)
    datas.user = bot.users.get(datas.user_id)
    datas.rule_trigger_type = {1: "KEYWORD", 3: "SPAM", 4: "KEYWORD_PRESET", 5:"MENTION_SPAM"}[datas.rule_trigger_type]
    if(bot.database_state !== "unstable") bot.emit(name(), bot, datas)
}

function name(){ return "AUTO_MODERATION_ACTION_EXECUTION" }