module.exports = async (bot, datas) => {
  const guild = bot.guilds.get(datas.guild_id)
  if(!datas.guild_id || !guild) return
  const oldchannel = guild.channels.get(datas.id)
  guild.channels.__delete(datas.id)
  bot.channels.__delete(datas.id)
  if(bot.database_state !== "unstable") bot.emit(name(), bot, oldchannel)
}

function name(){ return "CHANNEL_DELETE" }