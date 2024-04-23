const interactionAutocompleteCreateEvent = require('./INTERACTION_AUTOCOMPLETE_CREATE')

module.exports = async (bot, datas) => {
    let vtype = null
    if(datas.type === 3 && datas.data && datas.data.component_type && datas.data.component_type === 2) vtype = "Button"
    if(datas.type === 3 && datas.data && datas.data.component_type && datas.data.component_type === 3) vtype = "ContextMenu"
    if(datas.type === 2) vtype = "Slash"
    if(datas.type === 5) vtype = "modal"
    delete datas.guild

    if (!vtype) {
        return interactionAutocompleteCreateEvent(bot, datas)
    }

    let classResult = require(`../../structures/singles/interactions/${vtype}`)
    bot.emit(name(), bot,  new classResult(datas, bot))
}
function name(){ return "INTERACTION_CREATE" }