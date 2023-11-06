const Result = require("./results/messagedelete")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    var oldmessage_v
    if(guild) oldmessage_v = guild.messages.get(datas.id)
    if(oldmessage_v) guild.messages._delete(oldmessage_v.id)
    
    if(bot.databaseState){
        if(!guild) bot.emit(name(), bot, (new Result(datas, bot)))
        else if(oldmessage_v) bot.emit(name(), bot, oldmessage_v)
    }
}

function name(){ return "MESSAGE_DELETE" }