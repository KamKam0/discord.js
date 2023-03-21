const Base = require("../bases/basemultiple")
class Messages extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "message")
    }
}

module.exports = Messages