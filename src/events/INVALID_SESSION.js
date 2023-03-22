module.exports = async (bot) => {
    bot.state = "isession"
    if(bot.database_state !== "unstable") bot.emit(name(), bot)
}

function name(){ return "INVALID_SESSION" }