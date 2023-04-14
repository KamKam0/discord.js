const Guild = require("../singles/guild")
const Base = require("../bases/basemultiple")
class Guilds extends Base{
    constructor(_bot){
        super(_bot, null, "guild")
    }
}

module.exports = Guilds