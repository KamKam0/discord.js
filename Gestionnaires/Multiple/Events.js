const Event = require("../Individual/Event")
const Base = require("./baseMultiple")
class Events extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }
}

module.exports = Events