const constance = require("../../utils/constants")

module.exports = async (bot, datas) => {
  if(bot.state === "processing"){
    deployGuild(bot, datas, true)
  }
  else if(bot.state === "ready"){
    deployGuild(bot, datas)
    if(bot.databaseState !== "unstable") bot.emit(name(), bot, bot.guilds.get(datas.id))
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

function analyseGuild(bot, datas, state){
  let tempoGuild = bot.ws.discordSide.available_ids.find(id => id.id === datas.id)
  if(tempoGuild){
    bot.ws.discordSide.available_ids.splice(bot.ws.discordSide.available_ids.indexOf(tempoGuild), 1)
    if(bot.ws.discordSide.available_ids.length === 0){
      bot.state = "ready"
      if(bot.databaseState !== "unstable" && state) bot.emit("READY", bot)
    }
  }else if(bot.databaseState !== "unstable") bot.emit(name(), bot, bot.guilds.get(datas.id))
}

async function deployGuild(bot, datas, state){
  if(datas.id){
    if(bot.databaseState === "stable"){
        let result = await bot.sql.select("general")
        let vid = result.find(re => re.ID === datas.id)
        if(!vid || !vid.ID){
            vid = {ID: datas.id, Language: bot.default_language, guild_state: "enable"}
            bot.sql.insert("general", vid)
            datas.db_language = bot.default_language
        }else if(vid.Language && constance.languagesAvailable.find(da => da.id === vid.Language)) datas.db_language  = vid.Language
        else datas.db_language = bot.default_language
    }else datas.db_language  = bot.default_language
  }
  analysePresences(datas)
  bot.users._addMultiple(datas.members.map(e => { return {...e.user, guild_id: datas.id}}))
  bot.channels._addMultiple(datas.channels.map(ch => { return {...ch, guild_id: datas.id}}))
  bot.channels._addMultiple(datas.threads.map(ch => { return {...ch, guild_id: datas.id}}))
  bot.guilds._add(datas)
  if(bot.state !== "ready") analyseGuild(bot, datas, state)
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