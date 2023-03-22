const Typing = require("../Event Result/Typing")
module.exports = async (bot, datas) => {
    if(bot.database_state !== "unstable") bot.emit(name(), bot, new Typing(datas, bot))
}

function name(){ return "TYPING_START" }