const reactinremoveall = require("../Event Result/MessageReactionRemoveAll")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    if(bot.database_state !== "unstable") bot.emit(name(), bot, new reactinremoveall(datas, bot))
}

function name(){ return "MESSAGE_REACTION_REMOVE_ALL" }