const pins = require("./results/pinupdate")
module.exports = async (bot, datas) => {
    let result = new pins(datas, bot)
    bot.emit(name(), bot, result)
}

function name(){ return "CHANNEL_PINS_UPDATE" }