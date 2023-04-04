module.exports = async (bot, datas) => {
    datas.guild = bot.guilds.get(datas.guild_id) || null
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, datas)
}

function name(){ return "INTEGRATION_DELETE" }