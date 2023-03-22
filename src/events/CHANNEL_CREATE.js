module.exports = async (bot, datas) => {
    datas.token = bot.discordjs.token
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id || !guild) return
    guild.channels._add(datas)
    bot.channels._add(datas)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, bot.channels.get(datas.id))
}

function name(){ return "CHANNEL_CREATE" }