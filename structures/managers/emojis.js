const Base = require("../bases/basemultiple")
class Emojis extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "emoji")
    }
}

module.exports = Emojis