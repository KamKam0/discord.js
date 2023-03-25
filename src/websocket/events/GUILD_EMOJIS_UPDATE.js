module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id || !guild) return
    let type = determine(datas, guild)
    switch(type){
      case("ADD"):
        require("./GUILD_EMOJI_CREATE")(bot, {...datas.emojis.find(emo => !guild.emojis.find(e => e.id === emo.id)), guild_id: guild.id})
      break;
      case("DELETE"):
        require("./GUILD_EMOJI_DELETE")(bot, guild.emojis.find(emo => !datas.emojis.find(e => e.id === emo.id)))
      break;
      case("UPDATE"):
        let newemoji;
        let oldemoji;

        let criteres = ["require_colons", "name", "managed", "available", "animated"]
      
        datas.emojis.forEach(emo => {
          if(!newemoji && !oldemoji){
            let tempoemo = guild.emojis.find(em => em.id === emo.id)
            criteres.forEach(cr => {
              if(emo[cr] !== tempoemo[cr]){
                newemoji = emo
                oldemoji = tempoemo
              } 
            })
          }
        })
      
        if(!newemoji || !oldemoji) return
        oldemoji.guild_id = guild.id
        newemoji.guild_id = guild.id
        require("./GUILD_EMOJI_UPDATE")(bot, oldemoji, newemoji)
      break;
    }
}

function determine(datas, guild){
  if(datas.emojis.length > guild.emojis.length) return "ADD"
  if(datas.emojis.length < guild.emojis.length) return "DELETE"
  if(datas.emojis.length === guild.emojis.length) return "UPDATE"
}