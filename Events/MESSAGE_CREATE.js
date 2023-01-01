const Message = require("../Gestionnaires/Individual/Message")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    datas.token = bot.discordjs.token
    const message = new Message(datas, bot)
    if(guild) guild.messages.AddMessage(datas)
    return message
}

function name(){ return "MESSAGE_CREATE" }