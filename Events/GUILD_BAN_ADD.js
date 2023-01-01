const Ban = require("../Gestionnaires/Individual/Ban")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    datas.token = bot.discordjs.token
    const ban = new Ban(datas, bot)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, ban)
}

function name(){ return "GUILD_BAN_ADD" }