const Result = require("../Event Result/MessageDelete")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    var oldmessage_v
    if(guild) oldmessage_v = guild.messages.get(datas.id)
    if(oldmessage_v) guild.messages.__delete(oldmessage_v.id)
    
    if(bot.database_state !== "unstable"){
        if(!guild) bot.emit(name(), bot, (new Result(datas, bot)))
        else if(oldmessage_v) bot.emit(name(), bot,oldmessage_v)
    }
}

function name(){ return "MESSAGE_DELETE" }