const reactionadd = require("../Event Result/MessageReactionAdd")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(bot.database_state !== "unstable") return 
    if(guild) bot.emit(name(), bot, new reactionadd(datas, bot))
}

function name(){ return "MESSAGE_REACTION_ADD" }