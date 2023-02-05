module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    
    if(!datas.guild_id || !guild) return

    const oldevent = guild.guild_scheduled_events.get(datas.id)

    guild.guild_scheduled_events.__delete(datas.id)
    
    if(bot.database_state !== "unstable") bot.emit(name(), bot, oldevent)
}

function name(){ return "GUILD_SCHEDULED_EVENT_DELETE" }