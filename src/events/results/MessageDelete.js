class MessageDelete{
    constructor(message, bot){
        this.id = message.id
        this.channel_id = message.channel_id || null
        this.channel = bot.channels.get(this.channel_id) || require("../utils/functions").channel_backup(this.channel_id, bot)
        this.guild_id = message.guild_id || null
        this.guild = message.guild || bot.guilds.get(this.guild_id) || null
        this.bot_token = bot.discordjs.token
        this._bot = bot
    }
}
module.exports = MessageDelete