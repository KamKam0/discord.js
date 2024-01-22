module.exports = async (bot, datas) => {
    let availableShort = bot.ws.discordSide.available_ids
    let guildInAvailable = availableShort.find(id => id.id === datas.id)
    let idsShort = bot.ws.discordSide.guild_ids
    let guildInIds = idsShort.find(id => id.id === datas.id)

    if(guildInAvailable) availableShort.splice(availableShort.indexOf(guildInAvailable), 1)
    if(guildInIds) idsShort.splice(idsShort.indexOf(guildInIds), 1)

    const guild = bot.guilds.get(datas.id)
    bot.guilds = bot.guilds._delete(datas.id)
    bot.users._deleteMultiple(guild.members.map(users => { return {user: users.ID, guild: guild.id}}))
    bot.channels._deleteMultiple(guild.channels.map(ch => ch.id))

    bot.emit(name(), bot, guild)
}

function name(){ return "GUILD_DELETE" }