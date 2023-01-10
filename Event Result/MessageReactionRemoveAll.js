class MessageReactionRemoveAll{
    constructor(message_add, bot){
        this.channel_id = message_add.channel_id || null
        this.guild_id = message_add.guild_id || null
        this.guild = message_add.guild || bot.guilds.get(this.guild_id) || null
        this.bot_token = bot.discordjs.token
        this.message_id = message_add.message_id
        this.channel = bot.channels.get(this.channel_id) || null
        this._bot = bot
    }
}
module.exports = MessageReactionRemoveAll