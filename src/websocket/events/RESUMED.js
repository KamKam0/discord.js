module.exports = async (bot) => {
    bot.state = "ready"
    if(bot.databaseState !== "unstable") bot.emit(name(), bot)
}
function name(){ return "RESUMED" }