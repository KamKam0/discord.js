const LogEntry = require("./results/logentry")
module.exports = async (bot, datas) => {
    let result = new LogEntry(datas, bot)
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, result)
}

function name(){ return "GUILD_AUDIT_LOG_ENTRY_CREATE" }