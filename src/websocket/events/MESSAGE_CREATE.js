const Message = require('../../structures/singles/message')
const ThreadMessage = require("../../structures/singles/threadmessage")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    let message;
    if(guild){
        if(guild.channels.get(datas.id)?.type.toLowerCase() === "guildtext") message = new ThreadMessage(datas, bot)
        else message = new Message(datas, bot)
        guild.messages._add(datas)
    }else message = new Message(datas, bot)
    bot.emit(name(), bot, message)
}

function name(){ return "MESSAGE_CREATE" }