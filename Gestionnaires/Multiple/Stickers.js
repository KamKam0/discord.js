const Base = require("./baseMultiple")
class Stickers extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "sticker")
    }
}

module.exports = Stickers