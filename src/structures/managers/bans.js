const Base = require("../bases/basemultiple")
class Bans extends Base{
    constructor(_bot, guild_id){
        super(_bot, guild_id, "ban")
    }
}

module.exports = Bans