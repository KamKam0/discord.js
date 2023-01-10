const Webhook = require("../Individual/Webhook")
const Base = require("./baseMultiple")
class Webhooks extends Base{
    constructor(bot, guildid){
        super(bot, guildid)
    }

    __AddWebhook(webhook){
        this.container.push(new Webhook({...webhook, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    __AddWebhooks(webhooks){
        webhooks.map(we => this.__AddWebhook(we))
        return this
    }

    __DeleteWebhook(ID){
        this.container.splice(this.container.indexOf(this.container.find(we => we.id === ID)), 1)
        return this
    }
}

module.exports = Webhooks