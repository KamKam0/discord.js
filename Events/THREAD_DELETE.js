module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    const thread = guild.threads.get(datas.id)
    guild.threads.__DeleteThread(datas.id)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, thread)
}

function name(){ return "THREAD_DELETE" }