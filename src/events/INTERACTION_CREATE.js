module.exports = async (bot, datas) => {
    datas.bot_token = bot.discordjs.token
    datas.bot_id = bot.user.id
    let vtype = null
    if(datas.type === 3 && datas.data && datas.data.component_type && datas.data.component_type === 2) vtype = "button"
    if(datas.type === 3 && datas.data && datas.data.component_type && datas.data.component_type === 3) vtype = "contextmenu"
    if(datas.type === 2) vtype = "command"
    if(datas.type === 5) vtype = "form"
    let classResult;
    if(vtype === "command") classResult = require("../structures/applicationscommands/command")
    else classResult = require(`../structures/components/${vtype}`)
    if(bot.database_state !== "unstable") bot.emit(name(), bot,  new classResult(datas, bot))
}
function name(){ return "INTERACTION_CREATE" }