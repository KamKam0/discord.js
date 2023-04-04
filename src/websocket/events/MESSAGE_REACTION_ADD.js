const reactionadd = require("./results/messagereactionadd")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(bot.databaseState) return 
    if(guild) bot.emit(name(), bot, new reactionadd(datas, bot))
}

function name(){ return "MESSAGE_REACTION_ADD" }