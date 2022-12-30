module.exports = async (bot, datas) => {
    datas.bot_token = bot.discordjs.token
    datas.bot_id = bot.user.id
    const guild = bot.guilds.get(datas.guild_id)
    let vtype = null
    if(datas.type === 3 && datas.data && datas.data.component_type && datas.data.component_type === 2) vtype = "Button"
    if(datas.type === 3 && datas.data && datas.data.component_type && datas.data.component_type === 3) vtype = "ContextMenu"
    if(datas.type === 2) vtype = "Slash"
    if(datas.type === 5) vtype = "Modal"
    let vcla = new (require(`../Gestionnaires/Individual/Interactions_/${vtype}`))({...datas, bot_token: bot.discordjs.token, bot_id: bot.user.id}, bot)
    if(guild) if(bot.database_state !== "unstable") bot.emit(name(), bot, vcla.SetChannel(bot.channels.get(vcla.channel_id)).SetGuild(guild).SetMember(guild?.members.get(vcla.user_id)).SetUser(bot.users.get(vcla.user_id)))
    if(!guild) if(bot.database_state !== "unstable") bot.emit(name(), bot, vcla.SetUser(bot.users.get(vcla.user_id)))
}
function name(){ return "INTERACTION_CREATE" }