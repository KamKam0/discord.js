const Base = require("../bases/basemuldecla")
const webhookMethod = require("../../methods/webhooks")

class Webhooks extends Base{
    constructor(bot, guild_id, channel_id){
        super(bot, guild_id)
        this.channel_id = channel_id
    }

    async create(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            channel_id: this.channel_id
        }
        return webhookMethod.create(informations, options)
    }

    async modify(id, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            channel_id: this.channel_id,
            id
        }
        return webhookMethod.create(informations, options)
    }

    async delete(id, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            channel_id: this.channel_id,
            id
        }
        return webhookMethod.delete(informations,options)
    }

    async fetchAll(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            channel_id: this.channel_id
        }
        return webhookMethod.getchannel(informations)
    }

    async fetch(id){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id,
            channel_id: this.channel_id
        }
        return webhookMethod.get(informations)
    }
}

module.exports = Webhooks