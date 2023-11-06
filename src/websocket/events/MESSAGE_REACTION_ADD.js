const reactionClass = require("./results/messagereaction")
module.exports = async (bot, datas) => {
    let reactionInstance = new reactionClass(datas, bot)
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, reactionInstance)
}

function name(){ return "MESSAGE_REACTION_ADD" }