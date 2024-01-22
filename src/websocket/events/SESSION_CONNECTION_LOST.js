module.exports = async (bot) => {
    bot.state = "isession"
    bot.emit(name(), bot)
}

function name(){ return "SESSION_CONNECTION_LOST" }