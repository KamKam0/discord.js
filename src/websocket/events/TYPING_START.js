const Typing = require("./results/typing")
module.exports = async (bot, datas) => {
    bot.emit(name(), bot, new Typing(datas, bot))
}

function name(){ return "TYPING_START" }