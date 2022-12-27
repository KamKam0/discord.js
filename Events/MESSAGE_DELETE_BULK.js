const MessageBulk = require("../Event Result/MessageBulk")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(guild) guild.messages.DeleteMessages(datas.ids)
    if(bot.database_state === "stable") bot.emit(name(), bot, (new MessageBulk({...datas}, bot)).SetGuild(guild).SetChannel(guild.channels.get(datas.channel_id)))
}

function name(){ return "MESSAGE_DELETE_BULK" }