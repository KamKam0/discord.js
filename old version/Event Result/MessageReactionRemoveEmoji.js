class MessageReactionRemoveRemove{
    constructor(message_add, bot){
        this.channel_id = message_add.channel_id || null
        this.channel = bot.channels.get(this.channel_id) || null
        this.guild_id = message_add.guild_id || null
        this.guild = message_add.guild || bot.guilds.get(this.guild_id) || null
        this.bot_token = bot.discordjs.token
        this.message_id = message_add.message_id
        this.emoji = message_add.emoji
        this._bot = bot
    }
}
module.exports = MessageReactionRemoveRemove