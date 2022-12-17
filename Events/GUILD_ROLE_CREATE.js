module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    
    if(!datas.guild_id || !guild) return
  
    guild.roles.AddRole({...datas.role, guild_id: guild.id})
    
    if(bot.database_state === "stable") bot.emit(name(), bot, guild.roles.get(datas.role.id))
}

function name(){ return "GUILD_ROLE_CREATE" }