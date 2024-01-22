module.exports = async (bot) => {
    bot.state = "ready"
    bot.emit(name(), bot)
}
function name(){ return "RESUMED" }