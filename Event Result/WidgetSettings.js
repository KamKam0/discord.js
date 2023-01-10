class WidgetSettings{
    constructor(wsteeings, bot){
        this.channel_id = wsteeings.channel_id || null
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.enabled = wsteeings.enabled
        this.bot_token = bot.discordjs.token
        this._bot = bot
    }
}
module.exports = WidgetSettings