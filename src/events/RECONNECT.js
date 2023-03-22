module.exports = async (bot) => {
    bot.state = "reconnect"
    if(bot.database_state !== "unstable") bot.emit(name(), bot)
}

function name(){ return "RECONNECT" }