module.exports = async (bot, datas) => {
    datas.guild = bot.guilds.get(datas.guild_id) || null
    if(bot.databaseState !== "unstable") bot.emit(name(), bot, datas)
}

function name(){ return "INTEGRATION_DELETE" }