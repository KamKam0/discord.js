const Base = require("./baseMultiple")
class Events extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "event")
    }
}

module.exports = Events