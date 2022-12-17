module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id || !guild) return
    const oldmember = guild.members.get(datas.user.id)
    guild.members.DeleteMember(datas.user.id)
    bot.users.DeleteUser({user: datas.user.id, guild: datas.guild_id})
    if(bot.database_state === "stable") bot.emit(name(), bot, oldmember)
}

function name(){ return "GUILD_MEMBER_REMOVE" }