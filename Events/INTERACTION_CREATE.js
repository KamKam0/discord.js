module.exports = async (bot, datas) => {
    datas.bot_token = bot.discordjs.token
    datas.bot_id = bot.user.id
    const guild = bot.guilds.get(datas.guild_id)
    let vtype = null
    if(datas.type === 3 && datas.data && datas.data.component_type && datas.data.component_type === 2) vtype = "Button"
    if(datas.type === 3 && datas.data && datas.data.component_type && datas.data.component_type === 3) vtype = "ContextMenu"
    if(datas.type === 2) vtype = "Slash"
    if(datas.type === 5) vtype = "Modal"
    if(bot.database_state !== "unstable") bot.emit(name(), bot,  new (require(`../Gestionnaires/Individual/Interactions_/${vtype}`))({...datas, bot_id: bot.user.id}, bot))
}
function name(){ return "INTERACTION_CREATE" }