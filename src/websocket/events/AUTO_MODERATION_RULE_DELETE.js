const AutoMod = require("../../structures/singles/automoderation")
module.exports = async (bot, datas) => {
    let result = new AutoMod(datas, bot)
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, result)
}

function name(){ return "AUTO_MODERATION_RULE_DELETE" }