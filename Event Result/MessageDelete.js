class MessageDelete{
    constructor(message, bot){
        this.id = message.id
        this.channel_id = message.channel_id || null
        this.channel = bot.channels.get(this.channel_id) || require("../Utils/functions").channel_backup(this.channel_id, this.bot_token)
        this.guild_id = message.guild_id || null
        this.guild = message.guild || bot.guilds.get(this.guild_id) || null
        this.vguild_id = this.guild ? this.guild.vguild_id : null
        this.bot_token = bot.discordjs.token
        this._bot = bot
    }
}
module.exports = MessageDelete