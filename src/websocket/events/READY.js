const User = require("../../structures/client/user")
module.exports = async (bot, datas) => {
    bot.users.push(new User(datas.user, bot))
    bot.user = bot.users.get(datas.user.id)
    bot.user_id = datas.user.id
    bot.ws.discordSide.passedDatas = datas.v
    bot.ws.discordSide.available_ids = datas.guilds
    bot.ws.discordSide.guild_ids = datas.guilds
    bot.ws.discordSide.session_id = datas.session_id
    bot.ws.discordSide.reconnection_url = datas.resume_gateway_url
    if (bot.state === 'ready') {
        bot.emit("READY", bot)
    } else {
        if (bot.state === "processing") {
            if (bot.ws.discordSide.guild_ids.length === 0) {
                if (bot.ws.discordSide.timeoutGuildCreate) {
                    clearTimeout(bot.ws.discordSide.timeoutGuildCreate)
                    bot.ws.discordSide.timeoutGuildCreate = null
                }
                bot.state = "ready"
                bot.emit("READY", bot)
            } else {
                bot.ws.discordSide.timeoutGuildCreate = setTimeout(() => {
                    if (bot.state !== 'ready') {
                        bot.state = "ready"
                        bot.emit("READY", bot)
                    }
                    bot.ws.discordSide.timeoutGuildCreate = null
                }, 2 * 1000)
            }
        }
        if(bot.state === "isession"){
            let gu = bot.guilds.filter(g => !bot.ws.discordSide.guild_ids.includes(g.id))
            if(gu[0]) bot.guilds._deleteMultiple(gu.map(g => g.id))
        }
    }
}