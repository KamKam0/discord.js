const Message = require('../structures/singles/message')
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    const message = new Message(datas, bot)
    if(guild) guild.messages._add(datas)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, message)
}

function name(){ return "MESSAGE_CREATE" }