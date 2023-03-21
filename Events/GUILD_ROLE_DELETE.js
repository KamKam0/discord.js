module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    
    if(!datas.guild_id || !guild) return
  
    const oldrole = guild.roles.get(datas.role_id)
    guild.roles._delete(datas.role_id)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, oldrole)
}

function name(){ return "GUILD_ROLE_DELETE" }