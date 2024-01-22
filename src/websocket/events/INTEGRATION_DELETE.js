module.exports = async (bot, datas) => {
    datas.guild = bot.guilds.get(datas.guild_id) || null
    bot.emit(name(), bot, datas)
}

function name(){ return "INTEGRATION_DELETE" }