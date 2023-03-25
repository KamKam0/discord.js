const reactionremove = require("./results/messagereactionremove")
module.exports = async (bot, datas) => { 
    const guild = bot.guilds.get(datas.guild_id)
    if(bot.databaseState !== "unstable") bot.emit(name(), bot, new reactionremove(datas, bot))
}

function name(){ return "MESSAGE_REACTION_REMOVE" }