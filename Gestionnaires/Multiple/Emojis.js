const Emoji = require("../Individual/Emoji")
const Base = require("./baseMultiple")
class Emojis extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }
}

module.exports = Emojis