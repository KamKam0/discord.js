module.exports = async (bot, sticker) => {
    const guild = bot.guilds.get(sticker.guild_id)
    const sticker2 = guild.stickers.get(sticker.id)
    guild.stickers.__delete(sticker.id)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, sticker2)
}

function name(){ return "GUILD_STICKER_DELETE" }