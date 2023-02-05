const Base = require("./baseMultiple")
class AutoMods extends Base{
    constructor(_bot, guild_id){
        super(_bot, guild_id, "automod")
    }
}

module.exports = AutoMods