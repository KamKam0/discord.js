module.exports = async (bot, emoji) => {
    const guild = bot.guilds.get(emoji.guild_id)
    const emoji2 = guild.emojis.get(emoji.id)
    guild.emojis.__delete(emoji.id)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, emoji2)
}

function name(){ return "GUILD_EMOJI_DELETE" }