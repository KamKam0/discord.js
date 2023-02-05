const Ban = require("../Individual/Ban")
const Base = require("./baseMultiple")
class Bans extends Base{
    constructor(_bot, guild_id){
        super(_bot, guild_id, "ban")
    }
}

module.exports = Bans