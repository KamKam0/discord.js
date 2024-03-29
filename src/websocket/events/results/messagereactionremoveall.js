const guildBase = require("../../../structures/bases/baseguild")
const channelBackup = require("../../../utils/functions").general.channelBackup

class MessageReactionRemoveAll extends guildBase{
    constructor(message_remove_all, bot){
        super(message_remove_all, bot)

        this.user_id = message_remove_all.user_id || null
        this.user = this.user_id ? bot.users.get(this.user_id) : null

        this.channel_id = message_remove_all.channel_id || null
        this.channel = bot.channels.get(this.channel_id) || channelBackup(this.channel_id, bot)
        
        this.message_id = message_remove_all.message_id
    }
}
module.exports = MessageReactionRemoveAll