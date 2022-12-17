const User = require("../Gestionnaires/Individual/User")
module.exports = async (bot, datas) => {
    console.log("Beginning of the process")
    bot.user = new User({...datas.user, token: bot.discordjs.token})
    bot.discordjs.dvdatas = datas.v
    bot.discordjs.guild_ids = datas.guilds.map(g => { return {id: g.id, vid: null}})
    if(bot.discordjs.guild_ids.length === 0){
        bot.state = "ready"
        if(bot.database_state === "stable") bot.emit("READY", bot)
    }
    bot.discordjs.available_ids = datas.guilds
    bot.discordjs.session_id = datas.session_id
    bot.discordjs.reconnection_url = datas.resume_gateway_url
    if(bot.state === "isession"){
        let gu = bot.guilds.filter(g => !bot.discordjs.guild_ids.includes(g.id))
        if(gu[0]) bot.guilds.DeleteGuilds(gu.map(g => g.id))
        console.log("Bot Launched")
    }
}