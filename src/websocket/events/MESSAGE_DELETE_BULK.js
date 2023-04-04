const MessageBulk = require("./results/messagebulk")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(guild) guild.messages._deleteMultiple(datas.ids)
    let result = new MessageBulk(datas, bot)
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, result)
}

function name(){ return "MESSAGE_DELETE_BULK" }