module.exports = async (bot, datas) => {
    if(bot.discordjs.available_ids.find(id => id.id === datas.id)) bot.discordjs.available_ids = bot.discordjs.available_ids.filter(id => id.id !== datas.id)
    if(bot.discordjs.guild_ids.find(id => id.id === datas.id)) bot.discordjs.guild_ids = bot.discordjs.guild_ids.filter(id => id.id !== datas.id)
    const guild = bot.guilds.get(datas.id)
    bot.guilds = bot.guilds.__delete(datas.id)
    bot.users.__deleteMultiple(guild.members.Map(users => { return {user: users.ID, guild: guild.id}}))
    bot.channels.__deleteMultiple(guild.channels.map(ch => ch.id))
    if(bot.database_state !== "unstable") bot.emit(name(), bot, guild)
}

function name(){ return "GUILD_DELETE" }