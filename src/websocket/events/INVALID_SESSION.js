module.exports = async (bot) => {
    bot.state = "isession"
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot)
}

function name(){ return "INVALID_SESSION" }