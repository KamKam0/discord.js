const reactinremoveemoji = require("../Event Result/MessageReactionRemoveEmoji")
module.exports = async (bot, datas) => { 
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    if(bot.database_state !== "unstable") bot.emit(name(), bot, (new reactinremoveemoji({...datas}, bot)).SetGuild(guild).SetChannel(guild.channels.get(datas.channel_id))) 
}

function name(){ return "MESSAGE_REACTION_REMOVE_EMOJI" }