module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    const event = guild.stage_instances.get(datas.id)
    guild.stage_instances._delete(datas.id)
    bot.emit(name(), bot, event)
}

function name(){ return "STAGE_INSTANCE_DELETE" }