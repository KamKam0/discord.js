module.exports = async (bot, datas) => {
    bot.voice.onVoiceServer(datas)
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id|| !guild) return

    guild.voice.server = datas
    if(guild.voice.channel) require("../Discord.js - Voice").manage(bot, guild.id)
}