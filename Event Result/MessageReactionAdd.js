class MessageReactionAdd{
    constructor(message_add, bot){
        this.user_id = message_add.user_id || null
        this.user = this.user_id ? bot.users.get(this.user_id) : null
        this.channel_id = message_add.channel_id || null
        this.bot_token = bot.discordjs.token
        this.channel = bot.channels.get(this.channel_id) || require("../Utils/functions").channel_backup(this.channel_id, this.bot_token)
        this.message_id = message_add.message_id
        this.emoji = message_add.emoji
        this.guild_id = message_add.guild_id || null
        this.guild = message_add.guild || bot.guilds.get(this.guild_id) || null
        this.member = this.guild && this.user_id ? this.guild.users.get(this.user_id) : null
        this._bot = bot
    }
}
module.exports = MessageReactionAdd