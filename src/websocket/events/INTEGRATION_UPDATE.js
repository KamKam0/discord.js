const Integration = require("../../structures/singles/integration")
module.exports = async (bot, datas) => {
    bot.emit(name(), bot, (new Integration(datas, bot)))
}

function name(){ return "INTEGRATION_UPDATE" }