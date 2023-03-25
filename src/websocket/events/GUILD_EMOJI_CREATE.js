module.exports = async (bot, emoji) => {
    const guild = bot.guilds.get(emoji.guild_id)
    guild.emojis._add(emoji)
    if(bot.databaseState !== "unstable") bot.emit(name(), bot, guild.emojis.get(emoji.id))
}

function name(){ return "GUILD_EMOJI_CREATE" }