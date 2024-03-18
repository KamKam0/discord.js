module.exports = async (bot, datas) => {
    let vtype = null
    if(datas.type === 3 && datas.data && datas.data.component_type && datas.data.component_type === 2) vtype = "Button"
    if(datas.type === 3 && datas.data && datas.data.component_type && datas.data.component_type === 3) vtype = "Contextmenu"
    if(datas.type === 2) vtype = "Slash"
    if(datas.type === 5) vtype = "Modal"
    delete datas.guild
    let classResult = require(`../../structures/singles/interactions/${vtype}`)
    bot.emit(name(), bot,  new classResult(datas, bot))
}
function name(){ return "INTERACTION_CREATE" }