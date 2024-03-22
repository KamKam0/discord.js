module.exports = async (bot, datas) => {
  if(['processing', 'ready'].includes(bot.state)){
    deployGuild(bot, datas)
  }
  else if(bot.state === "isession"){
    if(!bot.guilds.get(datas.id)) deployGuild(bot, datas)
    else{
      analysePresences(datas)
      bot.guilds._ReplaceGuild(datas)
      bot.channels._deleteMultiple(datas.channels.map(ch => ch.id))
      bot.channels._deleteMultiple(datas.threads.map(ch => ch.id))
      bot.channels._addMultiple(datas.channels.map(ch => { return {...ch, guild_id: datas.id}}))
      bot.channels._addMultiple(datas.threads.map(ch => { return {...ch, guild_id: datas.id}}))
      bot.users._CheckUsers(datas)
    }
  }
}

function name(){ return "GUILD_CREATE" }

function analyseGuild(bot, datas){
  let tempoGuild = bot.ws.discordSide.available_ids.find(id => id.id === datas.id)
  if(tempoGuild){
    if (bot.ws.discordSide.timeoutGuildCreate) {
      clearTimeout(bot.ws.discordSide.timeoutGuildCreate)
      bot.ws.discordSide.timeoutGuildCreate = null
    }
    bot.ws.discordSide.available_ids.splice(bot.ws.discordSide.available_ids.indexOf(tempoGuild), 1)
    if (bot.state === "processing") {
      if(bot.ws.discordSide.available_ids.length === 0){
        bot.state = "ready"
        bot.emit("READY", bot)
      } else {
        bot.ws.discordSide.timeoutGuildCreate = setTimeout(() => {
          if (bot.state !== 'ready') {
            bot.state = "ready"
            bot.emit("READY", bot)
          }
          bot.ws.discordSide.timeoutGuildCreate = null
        }, 2 * 1000)
      }
    }
  }else bot.emit(name(), bot, bot.guilds.get(datas.id))
}

async function deployGuild(bot, datas, state){
  analysePresences(datas)
  bot.users._addMultiple(datas.members.map(e => { return {...e.user, guild_id: datas.id}}))
  bot.guilds._add(datas)
  bot.channels._addMultiple(datas.channels.map(ch => { return {...ch, guild_id: datas.id}}))
  bot.channels._addMultiple(datas.threads.map(ch => { return {...ch, guild_id: datas.id}}))
  analyseGuild(bot, datas)
}

function analysePresences(datas){
  datas.presences.push(...datas.members.filter(me => !datas.presences.find(pr => pr.user_id === me.user.id)).map(e => {
    return {
      user_id: e.user.id,
      status: "offline",
      activities: []
    }
  }))
  return datas
}