const createEvent = require("./GUILD_STICKER_CREATE")
const modifyEvent = require("./GUILD_STICKER_UPDATE")
const deleteEvent = require("./GUILD_STICKER_DELETE")
module.exports = async (bot, datas) => {
  const guild = bot.guilds.get(datas.guild_id)
  if(!datas.guild_id || !guild) return
  let type = determine(datas, guild)
  switch(type){
    case("ADD"):
      createEvent(bot, {...datas.stickers.find(emo => !guild.stickers.find(e => e.id === emo.id)), guild_id: guild.id})
    break;
    case("DELETE"):
      deleteEvent(bot, guild.stickers.find(emo => !datas.stickers.find(e => e.id === emo.id)))
    break;
    case("UPDATE"):
      let newsticker;
      let oldsticker;

      let criteres = ["id", "description", "name", "type", "format_type", "available"]
    
      datas.stickers
      .map(sticker => {
        if (!sticker.description.length) {
          sticker.description = null
        }

        return sticker
      })
      .forEach(emo => {
        if(!newsticker && !oldsticker){
          let tempoemo = guild.stickers.find(em => em.id === emo.id)
          criteres.forEach(cr => {
            if(emo[cr] !== tempoemo[cr]){
              newsticker = emo
              oldsticker = tempoemo
            } 
          })
        }
      })
    
      if(!newsticker || !oldsticker) return
      
      newsticker.guild_id = guild.id
      modifyEvent(bot, newsticker)
    break;
  }
}

function determine(datas, guild){
  if(datas.stickers.length > guild.stickers.length) return "ADD"
  if(datas.stickers.length < guild.stickers.length) return "DELETE"
  if(datas.stickers.length === guild.stickers.length) return "UPDATE"
}