module.exports = async (bot, datas) => {
    bot.state = "ready"
    console.log("RESUMED")
    if(bot.database_state !== "unstable") bot.emit(name(), bot)
}
function name(){ return "RESUMED" }