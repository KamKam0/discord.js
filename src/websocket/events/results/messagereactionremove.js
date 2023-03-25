const guildBase = require("../../../structures/bases/baseguild")
const channelBackup = require("../../../utils/functions").general.channelBackup

class MessageReactionRemove extends guildBase{
    constructor(message_remove, bot){
        super(message_remove, bot)

        this.user_id = message_remove.user_id || null
        this.user = this.user_id ? bot.users.get(this.user_id) : null

        this.channel_id = message_remove.channel_id || null
        this.channel = bot.channels.get(this.channel_id) || channelBackup(this.channel_id, bot)
        
        this.message_id = message_remove.message_id
        this.emoji = message_remove.emoji
        this.member = this.guild && this.user_id ? this.guild.users.get(this.user_id) : null
    }
}
module.exports = MessageReactionRemove