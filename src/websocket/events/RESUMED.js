module.exports = async (bot) => {
    bot.state = "ready"
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot)
}
function name(){ return "RESUMED" }