module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    
    if(!datas.guild_id || !guild) return

    const oldevent = guild.guild_scheduled_events.get(datas.id)

    guild.guild_scheduled_events._delete(datas.id)
    
    bot.emit(name(), bot, oldevent)
}

function name(){ return "GUILD_SCHEDULED_EVENT_DELETE" }