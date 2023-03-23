const guildBase = require("../../structures/bases/baseguild")
class MessageBulk extends guildBase{
    constructor(message_bulk, bot){
        super(message_bulk, bot)
        this.ids = message_bulk.ids
        
        this.channel_id = message_bulk.channel_id || null
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
    }
}
module.exports = MessageBulk