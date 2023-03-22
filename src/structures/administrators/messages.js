const BaseMessage = require("../managers/messages")
class Messages extends BaseMessage{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }
}

module.exports = Messages