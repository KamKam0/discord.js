const GuildText = require("../../bases/channels/guildtext")
const WebhooksAdministrator = require("../../administrators/webhooks")
class Channel extends GuildText{
    constructor(channel, bot){
        super(channel, bot)
        this.topic = channel.topic || null
        this.webhooks = new WebhooksAdministrator(bot, this.guild_id, this.id)
    }
}
module.exports = Channel