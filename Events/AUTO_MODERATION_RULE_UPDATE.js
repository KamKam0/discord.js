const AutoMod = require("../Gestionnaires/Individual/AutoModeration")
module.exports = async (bot, datas) => {
    if(bot.database_state !== "unstable") bot.emit(name(), bot, (new AutoMod(datas, bot)))
}

function name(){ return "AUTO_MODERATION_RULE_UPDATE" }