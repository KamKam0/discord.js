const Ban = require("../../structures/singles/ban")
module.exports = async (bot, datas) => {
    const ban = new Ban(datas, bot)
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, ban)
}
function name(){ return "GUILD_BAN_REMOVE" }