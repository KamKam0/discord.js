module.exports = async (bot) => {
    bot.state = "isession"
    if(bot.database_state !== "unstable") bot.emit(name(), bot)
}

function name(){ return "SESSION_CONNECTION_LOST" }