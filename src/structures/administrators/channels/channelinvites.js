const Base = require("../../bases/basemuldecla")
const channelMethod = require("../../../methods/channel")

class ChannelInvites extends Base{
    constructor(bot, guild_id, channel_id){
        super(bot, guild_id)
        this.channel_id = channel_id
    }

    async create(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.channel_id
        }
        return channelMethod.createinvite(informations)
    }

    async fetchAll(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.channel_id
        }
        return channelMethod.getinvites(informations)
    }

    /**
    * @param {object} [queryParams] 
    * @param {boolean} [queryParams.with_counts]
    * @param {string} [queryParams.guild_scheduled_event_id] ID
    * @param {boolean} [queryParams.with_expiration] 
    * @returns 
    */
    async fetch(id, queryParams){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id
        }
        return channelMethod.getinvite(informations, queryParams)
    }

    async delete(id, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id
        }
        return channelMethod.deleteinvite(informations, options)
    }
}

module.exports = ChannelInvites