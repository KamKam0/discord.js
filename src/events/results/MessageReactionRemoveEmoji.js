const guildBase = require("../../structures/bases/baseguild")

class MessageReactionRemoveEmoji extends guildBase{
    constructor(message_remove_emoji, bot){
        super(message_remove_emoji, bot)

        this.user_id = message_remove_emoji.user_id || null
        this.user = this.user_id ? bot.users.get(this.user_id) : null

        this.channel_id = message_remove_emoji.channel_id || null
        this.channel = bot.channels.get(this.channel_id) || require("../utils/functions").channel_backup(this.channel_id, bot)
        
        this.message_id = message_remove_emoji.message_id
        this.emoji = message_remove_emoji.emoji
    }
}
module.exports = MessageReactionRemoveEmoji