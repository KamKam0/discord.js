let automodExe = require("./results/automodexecute")
module.exports = async (bot, datas) => {
    let result = new automodExe(datas, bot)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, result)
}

function name(){ return "AUTO_MODERATION_ACTION_EXECUTION" }