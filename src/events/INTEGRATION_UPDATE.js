const Integration = require("../Gestionnaires/Individual/Integration")
module.exports = async (bot, datas) => {
    if(bot.database_state !== "unstable") bot.emit(name(), bot, (new Integration(datas, bot)))
}

function name(){ return "INTEGRATION_UPDATE" }