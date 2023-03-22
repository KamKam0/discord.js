class MessageBulk{
    constructor(message_bulk, bot){
        this.ids = message_bulk.ids
        this.guild_id = message_bulk.guild_id || null
        this.channel_id = message_bulk.channel_id || null
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.guild = message_bulk.guild || bot.guilds.get(this.guild_id) || null
        this.bot_token = bot.discordjs.token
        this._bot = bot
    }
}
module.exports = MessageBulk