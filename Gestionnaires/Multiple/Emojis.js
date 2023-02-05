const Base = require("./baseMultiple")
class Emojis extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "emoji")
    }
}

module.exports = Emojis