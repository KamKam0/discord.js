const Base = require("../bases/basemuldecla")
const messageMethod = require("../../methods/message")
const channelMethod = require("../../methods/channel")

class Pins extends Base{
    constructor(bot, channel_id){
        super(bot)
        this.channel_id = channel_id
    }

    /**
     * 
     * @returns 
     */
    async fetchAll(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.channel_id
        }
        return channelMethod.getpins(informations)
    }

    async pin(id, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            channel_id: this.channel_id,
            id
        }
        return messageMethod.pin(informations, options)
    }

    async unpin(id, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            channel_id: this.channel_id,
            id
        }
        return messageMethod.unpin(informations, options)
    }
}

module.exports = Pins