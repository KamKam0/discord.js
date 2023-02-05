const Role = require("../Individual/Role")
const Base = require("./baseMultiple")
class Roles extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }
}

module.exports = Roles