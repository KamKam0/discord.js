const Base = require("../bases/basemultiple")
class Roles extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "role")
    }
}

module.exports = Roles