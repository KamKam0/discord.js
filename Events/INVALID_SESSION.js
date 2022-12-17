module.exports = async (bot) => {
    if(bot.database_state === "stable") bot.emit(name(), bot)
}

function name(){ return "INVALID_SESSION" }