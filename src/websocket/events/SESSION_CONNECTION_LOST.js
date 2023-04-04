module.exports = async (bot) => {
    bot.state = "isession"
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot)
}

function name(){ return "SESSION_CONNECTION_LOST" }