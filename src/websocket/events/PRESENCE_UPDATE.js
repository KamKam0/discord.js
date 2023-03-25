module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    
    if(!datas.guild_id|| !guild) return
    guild.presences._Treat(datas)
    if(`${datas.user ? datas.user.id : datas.user_id}` === bot.user.id) bot.presence = new (require("../../structures/singles/presence"))(datas, bot)
}