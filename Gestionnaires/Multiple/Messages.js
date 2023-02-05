const Base = require("./baseMultiple")
class Messages extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "message")
    }
}

module.exports = Messages