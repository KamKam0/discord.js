const Integration = require("../../structures/singles/integration")
module.exports = async (bot, datas) => {
    if(bot.databaseState !== "unstable") bot.emit(name(), bot, (new Integration(datas, bot)))
}

function name(){ return "INTEGRATION_UPDATE" }