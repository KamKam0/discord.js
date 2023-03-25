module.exports = async (bot, datas) => {
    let vtype = null
    if(datas.type === 3 && datas.data && datas.data.component_type && datas.data.component_type === 2) vtype = "button"
    if(datas.type === 3 && datas.data && datas.data.component_type && datas.data.component_type === 3) vtype = "contextmenu"
    if(datas.type === 2) vtype = "slash"
    if(datas.type === 5) vtype = "form"
    let classResult = require(`../../structures/singles/interactions/${vtype}`)
    if(bot.databaseState !== "unstable") bot.emit(name(), bot,  new classResult(datas, bot))
}
function name(){ return "INTERACTION_CREATE" }