let automodExe = require("./results/automodexecute")
module.exports = async (bot, datas) => {
    let result = new automodExe(datas, bot)
    bot.emit(name(), bot, result)
}

function name(){ return "AUTO_MODERATION_ACTION_EXECUTION" }