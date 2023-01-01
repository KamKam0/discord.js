const MessageBulk = require("../Event Result/MessageBulk")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(guild) guild.messages.DeleteMessages(datas.ids)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, (new MessageBulk({...datas}, bot)))
}

function name(){ return "MESSAGE_DELETE_BULK" }