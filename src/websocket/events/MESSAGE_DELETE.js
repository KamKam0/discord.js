const Result = require("./results/messagedelete")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    let dataToSend;
    if(guild) {
        dataToSend = guild.messages.get(datas.id)
    }

    if(dataToSend) {
        guild.messages._delete(dataToSend.id)
    } else {
        dataToSend = new Result(datas, bot)
    }
    
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, dataToSend)
}

function name(){ return "MESSAGE_DELETE" }