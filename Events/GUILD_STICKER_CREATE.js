module.exports = async (bot, sticker) => {
    const guild = bot.guilds.get(sticker.guild_id)
    guild.stickers.AddSticker(sticker)
    if(bot.database_state === "stable") bot.emit(name(), bot, guild.stickers.get(sticker.id))
}

function name(){ return "GUILD_STICKER_CREATE" }