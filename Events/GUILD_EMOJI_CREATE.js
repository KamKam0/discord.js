module.exports = async (bot, emoji) => {
    const guild = bot.guilds.get(emoji.guild_id)
    guild.emojis.__add(emoji)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, guild.emojis.get(emoji.id))
}

function name(){ return "GUILD_EMOJI_CREATE" }