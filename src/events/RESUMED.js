module.exports = async (bot) => {
    bot.state = "ready"
    if(bot.database_state !== "unstable") bot.emit(name(), bot)
}
function name(){ return "RESUMED" }