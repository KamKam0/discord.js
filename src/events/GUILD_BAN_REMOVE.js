const Ban = require("../structures/singles/ban")
module.exports = async (bot, datas) => {
    const ban = new Ban(datas, bot)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, ban)
}
function name(){ return "GUILD_BAN_REMOVE" }