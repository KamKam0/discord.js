const BaseMessage = require("../Gestionnaires/Multiple/Messages")
class Messages extends BaseMessage{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }
}

module.exports = Messages