const Base = require("../../bases/basemuldecla")
const channelMethod = require("../../../methods/channel")
const messageMethod = require("../../../methods/message")
const collector = require("../../../handlers/collector")

class ChannelInvites extends Base{
    constructor(bot, guild_id, channel_id){
        super(bot, guild_id)
        this.channel_id = channel_id
    }

    /**
     * 
     * @param {object} options
     * @param {string} options.user_id
     * @param {number} options.number
     * @param {number} options.time
     * @returns 
     */
    async awaitMessages(options){
        return collector(this._bot, "message", {channel_id: this.id, guild_id: this.guild_id || null}, options)
    }

    /**
     * 
     * @param {object} options
     * @param {string} options.user_id
     * @param {number} options.number
     * @param {number} options.time
     * @returns 
     */
    collectMessages(options){
        return collector.collect(this._bot, "message", {channel_id: this.id, guild_id: this.guild_id || null}, options)
    }

    /**
     * 
     * @param {object} [queryParams] 
     * @param {string} [queryParams.before] ID
     * @param {string} [queryParams.after] ID
     * @param {number} [queryParams.limit] 
     * @param {string} [queryParams.around] ID
     * @returns 
     */
    async fetchAll(queryParams){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            channel_id: this.id
        }
        return messageMethod.fetch_messages(informations, queryParams)
    }

    async fetch(id){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id,
            channel_id: this.id
        }
        return messageMethod.fetch_message(informations)
    }

    async delete(id, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id
        }
        return channelMethod.deleteinvite(informations,options)
    }
}

module.exports = ChannelInvites