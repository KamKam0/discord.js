const Message = require("../Individual/Message")
const Base = require("./baseMultiple")
class Messages extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }
}

module.exports = Messages