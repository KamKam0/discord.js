module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id || !guild) return
    guild.members._add(datas)
    bot.users._add({...datas.user, guild_id: datas.guild_id})
    if(bot.database_state !== "unstable") bot.emit(name(), bot, guild.members.get(datas.user.id))
}

function name(){ return "GUILD_MEMBER_ADD" }