const SlashInteration = require('../../structures/singles/interactions/AutocompleteSlash')

module.exports = async (bot, datas) => {
    bot.emit("INTERACTION_AUTOCOMPLETE_CREATE", bot,  new SlashInteration(datas, bot))
}

function name(){ return "INTERACTION_AUTOCOMPLETE_CREATE" }