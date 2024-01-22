module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    
    if(!datas.guild_id || !guild) return
  
    guild.roles._add({...datas.role, guild_id: guild.id})
    
    bot.emit(name(), bot, guild.roles.get(datas.role.id))
}

function name(){ return "GUILD_ROLE_CREATE" }