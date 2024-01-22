module.exports = async (bot) => {
    bot.state = "reconnect"
    bot.emit(name(), bot)
}

function name(){ return "RECONNECT" }