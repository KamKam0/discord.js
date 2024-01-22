module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id || !guild) return
    let channel = guild.channels.get(datas.id)

    bot.emit(name(), bot, channel, datas.topic)
}

function name(){ return "CHANNEL_TOPIC_UPDATE" }