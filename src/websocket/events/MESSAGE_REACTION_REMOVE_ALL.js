const reactinremoveall = require("./results/messagereactionremoveall")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    bot.emit(name(), bot, new reactinremoveall(datas, bot))
}

function name(){ return "MESSAGE_REACTION_REMOVE_ALL" }