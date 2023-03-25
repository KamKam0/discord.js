module.exports = async (bot) => {
    bot.state = "isession"
    if(bot.databaseState !== "unstable") bot.emit(name(), bot)
}

function name(){ return "INVALID_SESSION" }