const reactinremoveemoji = require("./results/messagereactionremoveemoji")
module.exports = async (bot, datas) => { 
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    if(bot.databaseState !== "unstable") bot.emit(name(), bot, new reactinremoveemoji(datas, bot))
}

function name(){ return "MESSAGE_REACTION_REMOVE_EMOJI" }