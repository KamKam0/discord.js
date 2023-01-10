module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id || !guild) return
    const oldmember = guild.members.get(datas.user.id)
    guild.members.__DeleteMember(datas.user.id)
    bot.users.__DeleteUser({user: datas.user.id, guild: datas.guild_id})
    if(bot.database_state !== "unstable") bot.emit(name(), bot, oldmember)
}

function name(){ return "GUILD_MEMBER_REMOVE" }