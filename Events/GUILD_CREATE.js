module.exports = async (bot, datas) => {
  datas.token = bot.discordjs.token
  if(bot.state === "processing" || bot.state === "ready"){
    if(datas.id){
      if(bot.database_state === "stable"){
          let result = await bot.sql.select("general")
          let vid = result.find(re => re.ID === datas.id)
          if(!vid || !vid.ID){
              vid = {ID, Language: this.default_language, guild_state: "enable"}
              bot.sql.insert("general", vid)
              datas.db_language  = bot.default_lan
          }else datas.db_language  = vid.Language
      }else datas.db_language  = bot.default_language
    }
    datas.presences.push(...datas.members.filter(me => !datas.presences.find(pr => pr.user_id === me.user.id)).map(e => {
      return {
        user_id: e.user.id,
        status: "offline",
        activities: []
      }
    }))
    bot.users.__AddUsers(datas.members.map(e => { return {...e.user, guild_id: datas.id}}))
    bot.channels.__AddChannels(datas.channels.map(ch => { return {...ch, guild_id: datas.id}}))
    bot.guilds.__AddGuild(datas)
    if(bot.state === "processing"){
      if(bot.discordjs.available_ids.find(id => id.id === datas.id)){
        bot.discordjs.available_ids = bot.discordjs.available_ids.filter(id => id.id !== datas.id)
        if(bot.discordjs.available_ids.length === 0){
          bot.state = "ready"
          if(bot.database_state !== "unstable") bot.emit("READY", bot)
        }
      }else if(bot.database_state !== "unstable") bot.emit(name(), bot, bot.guilds.get(datas.id))
    }else if(bot.database_state !== "unstable") bot.emit(name(), bot, bot.guilds.get(datas.id))
  }
  if(bot.state === "isession"){
    if(!bot.guilds.get(datas.id)){
      datas.presences.push(...datas.members.filter(me => !datas.presences.find(pr => pr.user_id === me.user.id)).map(e => {
        return {
          user_id: e.user.id,
          status: "offline",
          activities: []
        }
      }))
      bot.guilds.__AddGuild(datas)
      bot.users.__AddUsers(datas.members.map(e => { return {...e.user, guild_id: datas.id}}))
      bot.channels.__AddChannels(datas.channels.map(ch => { return {...ch, guild_id: datas.id}}))
    }else{
      datas.presences.push(...datas.members.filter(me => !datas.presences.find(pr => pr.user_id === me.user.id)).map(e => {
        return {
          user_id: e.user.id,
          status: "offline",
          activities: []
        }
      }))
      bot.guilds.ReplaceGuild(datas)
      bot.channels.CheckChannels(datas)
      bot.users.CheckUsers(datas)
    }
    if(bot.discordjs.available_ids.find(id => id.id === datas.id)){
      bot.discordjs.available_ids = bot.discordjs.available_ids.filter(id => id.id !== datas.id)
      if(bot.discordjs.available_ids.length === 0) bot.state = "ready"
    }
  }
}

function name(){ return "GUILD_CREATE" }