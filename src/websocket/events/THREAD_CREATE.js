module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id || !guild) return
    guild.threads._add(datas)
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, guild.threads.get(datas.id))
}

function name(){ return "THREAD_CREATE" }