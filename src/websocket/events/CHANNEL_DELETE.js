module.exports = async (bot, datas) => {
  const guild = bot.guilds.get(datas.guild_id)
  let oldchannel;
  if(guild){
    oldchannel = guild.channels.get(datas.id)
    guild.channels._delete(datas.id)
  }else oldchannel = bot.channels.get(datas.id)
  bot.channels._delete(datas.id)
  if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, oldchannel)
}

function name(){ return "CHANNEL_DELETE" }