module.exports = async (bot) => {
    bot.state = "reconnect"
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot)
}

function name(){ return "RECONNECT" }