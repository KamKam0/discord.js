const Webhook = require("../Individual/Webhook")
const Base = require("./baseMultiple")
class Webhooks extends Base{
    constructor(bot, guildid){
        super(bot, guildid, "webhook")
    }
}

module.exports = Webhooks