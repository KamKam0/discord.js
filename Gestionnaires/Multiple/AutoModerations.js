const AutoModeation = require("../Individual/AutoModeration")
const Base = require("./baseMultiple")
class AutoMods extends Base{
    constructor(_bot, guild_id){
        super(_bot, guild_id)
    }
}

module.exports = AutoMods