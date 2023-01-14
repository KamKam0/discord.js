module.exports = async (bot, datas) => {
    datas.guild = bot.guilds.get(datas.guild_id)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, datas)
}

function name(){ return "APPLICATION_COMMAND_PERMISSIONS_UPDATE" }