module.exports = async (bot, datas) => {
    bot.state = "ready"
    if(bot.database_state !== "unstable") bot.emit(name(), bot)
}
function name(){ return "RESUMED" }