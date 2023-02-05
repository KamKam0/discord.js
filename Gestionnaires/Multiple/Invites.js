const Base = require("./baseMultiple")
class Invites extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "invite")
    }
}

module.exports = Invites