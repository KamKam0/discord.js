const GuildText = require("../../bases/channels/guildtext")
const ThreadAdministrator = require("../../administrators/threads")
const WebhooksAdministrator = require("../../administrators/webhooks")

class Channel extends GuildText{
    constructor(channel, bot){
        super(channel, bot)
        this.topic = channel.topic || null
        this.threads = new ThreadAdministrator(bot, this.guild_id)
        this.threads._addMultiple(this.guild.threads.filter(thread => thread.parent_id === this.id))
        this.webhooks = new WebhooksAdministrator(bot, this.guild_id, this.id)
    }
}
module.exports = Channel