const Result = require("../Event Result/MessageDelete")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    var oldmessage_v
    if(guild) oldmessage_v = guild.messages.get(datas.id)
    if(oldmessage_v) guild.messages.DeleteMessage(oldmessage_v.id)
    
    if(!guild) if(bot.database_state === "stable") bot.emit(name(), bot, (new Result(datas, bot)))
    if(oldmessage_v) if(bot.database_state === "stable") bot.emit(name(), bot,oldmessage_v)
}

function name(){ return "MESSAGE_DELETE" }