module.exports = async (bot) => {
    bot.state = "isession"
    bot.emit(name(), bot)
}

function name(){ return "INVALID_SESSION" }