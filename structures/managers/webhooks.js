const Base = require("../bases/basemultiple")
class Webhooks extends Base{
    constructor(bot, guildid){
        super(bot, guildid, "webhook")
    }
}

module.exports = Webhooks