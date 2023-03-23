const guildBase = require("../../structures/bases/baseguild")
class WebhookUpdate extends guildBase{
    constructor(webhook, bot){
        super(webhook, bot)

        this.channel_id = webhook.channel_id || null
        this.channel = this.channel_id ? this._bot.channels.get(this.channel_id) : null
    }
}
module.exports = WebhookUpdate