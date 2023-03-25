const webhook = require("./results/webhookupdate")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    datas.token = bot.discordjs.token
    
    if(!datas.guild_id|| !guild) return
    
    if(bot.databaseState !== "unstable") bot.emit(name(), bot, new webhook(datas, bot))
}

function name(){ return "WEBHOOKS_UPDATE" }