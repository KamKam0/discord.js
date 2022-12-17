const Unban = require("../Event Result/Unban")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    datas.token = bot.discordjs.token
    const unban = new Unban(datas)
    unban.SetGuild(guild)
    if(bot.database_state === "stable") bot.emit(name(), bot, unban)
}

function name(){ return "GUILD_BAN_REMOVE" }