const Base = require("../bases/basemultiple")
class Permissions extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "cpermissions")
    }
}

module.exports = Permissions