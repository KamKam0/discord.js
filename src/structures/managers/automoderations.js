const Base = require("../bases/basemultiple")
class AutoMods extends Base{
    constructor(_bot, guild_id){
        super(_bot, guild_id, "automod")
        this._compareFunction = (oldValue, newValue, property) => {
            // exempt_roles
            // exempt_channels
            // actions.type
        }
    }
}

module.exports = AutoMods