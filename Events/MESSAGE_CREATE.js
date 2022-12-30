const Message = require("../Gestionnaires/Individual/Message")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    datas.token = bot.discordjs.token
    const message = new Message(datas, bot)
    if(guild) guild.messages.AddMessage(datas)
    if(!guild) if(bot.database_state !== "unstable") bot.emit(name(), bot, message.SetUser(bot.users.get(message.user_id)).SetChannel(bot.channels.get(datas.channel_id)))
    if(guild) if(bot.database_state !== "unstable") bot.emit(name(), bot, guild.messages.get(datas.id))
}

function name(){ return "MESSAGE_CREATE" }