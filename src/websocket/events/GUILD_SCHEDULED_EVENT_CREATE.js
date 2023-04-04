module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id || !guild) return
    guild.guild_scheduled_events._add(datas)
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, guild.guild_scheduled_events.get(datas.id))
}

function name(){ return "GUILD_SCHEDULED_EVENT_CREATE" }