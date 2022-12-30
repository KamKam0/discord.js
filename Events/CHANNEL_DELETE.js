module.exports = async (bot, datas) => {
  const guild = bot.guilds.get(datas.guild_id)
  if(!datas.guild_id || !guild) return
  const oldchannel = guild.channels.get(datas.id)
  guild.channels.DeleteChannel(datas.id)
  bot.channels.DeleteChannel(datas.id)
  if(bot.database_state !== "unstable") bot.emit(name(), bot, oldchannel)
}

function name(){ return "CHANNEL_DELETE" }