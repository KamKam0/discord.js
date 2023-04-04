module.exports = async (bot, emoji) => {
    const guild = bot.guilds.get(emoji.guild_id)
    const emoji2 = guild.emojis.get(emoji.id)
    guild.emojis._delete(emoji.id)
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, emoji2)
}

function name(){ return "GUILD_EMOJI_DELETE" }