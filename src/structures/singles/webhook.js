const Base = require("../bases/baseguild")
const webhookTypes = require("../../types/webhook")
const webhookMethod = require("../../methods/webhooks")

class Webhook extends Base{
    constructor(webhook, bot){
        super(webhook, bot)

        this._modifyConstants.push({name: "type", data: webhookTypes.revert()})

        this.type = this._typechange(this._modifyConstants.find(e => e.name === "type").data, webhook.type)
        this.id = webhook.id
        this.channel_id = webhook.channel_id || null
        this.channel = webhook.channel_id ? bot.channels.get(webhook.channel_id) : null
        this.user_id = webhook.user ? webhook.user.id : null
        this.user = this.user_id ? bot.users.get(this.user_id) : null
        this.name = webhook.name || null
        this.avatar = webhook.avatar || null
        this.token = webhook.token
        this.application_id = webhook.application_id
        this.url = webhook.url || null
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async execute(options, queryParams){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            token: this.token,
            id: this.id
        }
        return webhookMethod.execute(informations, options, queryParams)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async modify(options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            id: this.id
        }
        return webhookMethod.modify(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async delete(options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            id: this.id
        }
        return webhookMethod.delete(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async getMessage(id, queryParams){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            id: this.id,
            token: this.token,
            message_id: id
        }
        return webhookMethod.getmessage(informations, queryParams)
    }

    /**
     * 
     * @returns 
     */
    async deleteMessage(id, queryParams){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            id: this.id,
            token: this.token,
            message_id: id
        }
        return webhookMethod.deletemessage(informations, queryParams)
    }

    /**
     * 
     * @returns 
     */
    async modifyMessage(id, options, queryParams){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            id: this.id,
            token: this.token,
            message_id: id
        }
        return webhookMethod.modifymessage(informations, options, queryParams)
    }
}
module.exports = Webhook