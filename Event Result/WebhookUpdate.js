class WebhookUpdate{
    constructor(webhook, bot){
        this.channel_id = webhook.channel_id || null
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.guild_id = webhook.guild_id || null
        this.guild = webhook.guild || bot.guilds.get(this.guild_id) || null
        this.bot_token = bot.discordjs.token
        this.vguild_id = this.guild ? this.guild.vguild_id : null
        this._bot = bot
    }
}
module.exports = WebhookUpdate