module.exports = async (bot) => {
    bot.state = "reconnect"
    if(bot.databaseState !== "unstable") bot.emit(name(), bot)
}

function name(){ return "RECONNECT" }