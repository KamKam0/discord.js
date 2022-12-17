module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    const event = guild.stage_instances.get(datas.id)
    guild.stage_instances.DeleteStage(datas.id)
    if(bot.database_state === "stable") bot.emit(name(), bot, event)
}

function name(){ return "STAGE_INSTANCE_DELETE" }