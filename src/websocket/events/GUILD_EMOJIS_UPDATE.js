const createEvent = require("./GUILD_EMOJI_CREATE")
const modifyEvent = require("./GUILD_EMOJI_UPDATE")
const deleteEvent = require("./GUILD_EMOJI_DELETE")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id || !guild) return
    let type = determine(datas, guild)
    switch(type){
      case("ADD"):
        createEvent(bot, {...datas.emojis.find(emo => !guild.emojis.find(e => e.id === emo.id)), guild_id: guild.id})
      break;
      case("DELETE"):
        deleteEvent(bot, guild.emojis.find(emo => !datas.emojis.find(e => e.id === emo.id)))
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
        
        newemoji.guild_id = guild.id
        modifyEvent(bot, newemoji)
      break;
    }
}

function determine(datas, guild){
  if(datas.emojis.length > guild.emojis.length) return "ADD"
  if(datas.emojis.length < guild.emojis.length) return "DELETE"
  if(datas.emojis.length === guild.emojis.length) return "UPDATE"
}