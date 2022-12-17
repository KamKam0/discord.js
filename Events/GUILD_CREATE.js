module.exports = async (bot, datas) => {
  datas.token = bot.discordjs.token
  if(bot.state === "processing" || bot.state === "ready"){
    if(datas.id){
      let gdta = await bot.ven(bot, datas.id)
      datas.vguild_id = gdta.ID
      datas.db_language = gdta.Language
    }
    datas.presences.push(...datas.members.filter(me => !datas.presences.find(pr => pr.user_id === me.user.id)).map(e => {
      return {
        user_id: e.user.id,
        status: "offline",
        activities: []
      }
    }))
    bot.guilds.AddGuild(datas)
    bot.users.AddUsers(datas.members.map(e => { return {...e.user, guild_id: datas.id}}))
    bot.channels.AddChannels(datas.channels.map(ch => { return {...ch, guild_id: datas.id}}))
    if(bot.state === "processing"){
      if(bot.discordjs.available_ids.find(id => id.id === datas.id)){
        bot.discordjs.available_ids = bot.discordjs.available_ids.filter(id => id.id !== datas.id)
        bot.discordjs.guild_ids.find(gu => gu.id === datas.id).vid = datas.vguild_id
        if(bot.discordjs.available_ids.length === 0){
          console.log("Bot Ready")
          bot.state = "ready"
          if(bot.database_state === "stable") bot.emit("READY", bot)
        }
      }else if(bot.database_state === "stable") bot.emit(name(), bot, bot.guilds.get(datas.id))
    }else if(bot.database_state === "stable") bot.emit(name(), bot, bot.guilds.get(datas.id))
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
      bot.guilds.AddGuild(datas)
      bot.users.AddUsers(datas.members.map(e => { return {...e.user, guild_id: datas.id}}))
      bot.channels.AddChannels(datas.channels.map(ch => { return {...ch, guild_id: datas.id}}))
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
  }
}

function name(){ return "GUILD_CREATE" }