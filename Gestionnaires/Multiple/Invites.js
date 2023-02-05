const Invite = require("../Individual/Invite")
const Base = require("./baseMultiple")
class Invites extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }
}

module.exports = Invites