const User = require("../../structures/singles/user")
module.exports = async (bot, datas) => {
    bot.user = new User(datas.user, bot)
    bot.ws.discordSide.passedDatas = datas.v
    bot.ws.discordSide.guild_ids = datas.guilds.map(g => { return {id: g.id}})
    if(bot.ws.discordSide.guild_ids.length === 0){
        bot.state = "ready"
        if(bot.databaseState || bot.databaseState === null) bot.emit("READY", bot)
    }
    bot.ws.discordSide.available_ids = datas.guilds
    bot.ws.discordSide.session_id = datas.session_id
    bot.ws.discordSide.reconnection_url = datas.resume_gateway_url
    if(bot.state === "isession"){
        let gu = bot.guilds.filter(g => !bot.ws.discordSide.guild_ids.includes(g.id))
        if(gu[0]) bot.guilds._deleteMultiple(gu.map(g => g.id))
    }
}