const Typing = require("./results/typing")
module.exports = async (bot, datas) => {
    if(bot.databaseState !== "unstable") bot.emit(name(), bot, new Typing(datas, bot))
}

function name(){ return "TYPING_START" }