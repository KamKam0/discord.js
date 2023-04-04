module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(guild) guild.channels._add(datas)
    bot.channels._add(datas)
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, bot.channels.get(datas.id))
}

function name(){ return "CHANNEL_CREATE" }