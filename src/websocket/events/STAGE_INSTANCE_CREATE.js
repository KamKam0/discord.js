module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    guild.stage_instances._add(datas)
    bot.emit(name(), bot, guild.stage_instances.get(datas.id))
}

function name(){ return "STAGE_INSTANCE_CREATE" }