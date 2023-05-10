const guildBase = require("../../../structures/bases/baseguild")
const channelBackup = require("../../../utils/functions").general.channelBackup

class MessageReaction extends guildBase{
    constructor(messageReaction, bot){
        super(messageReaction, bot)

        this.user_id = messageReaction.user_id || null
        this.user = this.user_id ? bot.users.get(this.user_id) : null

        this.channel_id = messageReaction.channel_id || null
        this.channel = bot.channels.get(this.channel_id) || channelBackup(this.channel_id, bot)
        
        this.message_id = messageReaction.message_id
        this.emoji = messageReaction.emoji
        this.member = this.guild && this.user_id ? this.guild.members.get(this.user_id) : null
    }
}
module.exports = MessageReaction