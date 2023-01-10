module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    
    if(!datas.guild_id|| !guild) return
    guild.presences.__Treat(datas)
    if(`${datas.user ? datas.user.id : datas.user_id}` === bot.user.id) bot.presence = new (require("../Gestionnaires/Individual/Presence"))(datas, bot)
}