const guildBase = require("../../structures/bases/baseguild")
class MessageDelete extends guildBase{
    constructor(message, bot){
        super(message, bot)

        this.id = message.id
        this.channel_id = message.channel_id || null
        this.channel = bot.channels.get(this.channel_id) || require("../../utils/functions").general.channelBackup(this.channel_id, bot)
    }
}
module.exports = MessageDelete