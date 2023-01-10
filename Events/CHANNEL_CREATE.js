module.exports = async (bot, datas) => {
    datas.token = bot.discordjs.token
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id || !guild) return
    guild.channels.__AddChannel(datas)
    bot.channels.__AddChannel(datas)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, bot.channels.get(datas.id))
}

function name(){ return "CHANNEL_CREATE" }