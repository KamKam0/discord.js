const guildBase = require("../../../structures/bases/baseguild")
const channelBackup = require("../../../utils/functions").general.channelBackup
class MessageDelete extends guildBase{
    constructor(message, bot){
        super(message, bot)

        this.id = message.id
        this.channel_id = message.channel_id || null
        this.channel = bot.channels.get(this.channel_id) || channelBackup(this.channel_id, bot)
    }
}
module.exports = MessageDelete