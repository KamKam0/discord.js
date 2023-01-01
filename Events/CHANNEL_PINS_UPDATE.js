const pins = require("../Event Result/PinUpdate")
module.exports = async (bot, datas) => {
    if(bot.database_state !== "unstable") bot.emit(name(), bot, (new pins({...datas}, bot)))
}

function name(){ return "CHANNEL_PINS_UPDATE" }