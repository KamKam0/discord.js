module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    
    if(!datas.guild_id || !guild) return

    let dataToReturn = {
        guild,
        guild_id: guild.id,
        event_id: datas.event_id
    }
    
    bot.emit(name(), bot, dataToReturn)
}

function name(){ return "GUILD_SCHEDULED_EVENT_EXCEPTIONS_DELETE" }