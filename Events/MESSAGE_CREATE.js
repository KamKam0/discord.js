const Message = require("../Gestionnaires/Individual/Message")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    datas.token = bot.discordjs.token
    const message = new Message(datas, bot)
    if(guild) guild.messages._add(datas)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, message)
}

function name(){ return "MESSAGE_CREATE" }