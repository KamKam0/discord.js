const AutoMod = require("../../structures/singles/automoderation")
module.exports = async (bot, datas) => {
    let result = new AutoMod(datas, bot)
    if(bot.databaseState !== "unstable") bot.emit(name(), bot, result)
}

function name(){ return "AUTO_MODERATION_RULE_UPDATE" }