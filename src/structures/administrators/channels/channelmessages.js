const Base = require("../../bases/basemuldecla")
const channelMethod = require("../../../methods/channel")
const messageMethod = require("../../../methods/message")
const collector = require("../../../handlers/collector")

class ChannelMessages extends Base{
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
        let collectorVerification = this._bot._handleCollectors(collector.check({channel_id: this.id, guild_id: this.guild_id || null}, options, "message"), 'await')
        if (collectorVerification) {
            return Promise.resolve([])
        }

        return new Promise((resolve, reject) => {
            collector(this._bot, "message", {channel_id: this.id, guild_id: this.guild_id || null}, options)
            .then(data => {
                this._bot._handleCollectors(collector.check({channel_id: this.id, guild_id: this.guild_id || null}, options, "message"), 'await', true)
                return resolve(data)
            })
            .catch(err => {
                this._bot._handleCollectors(collector.check({channel_id: this.id, guild_id: this.guild_id || null}, options, "message"), 'await', true)
                return reject(err)
            })
        })
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
        let collectorVerification = this._bot._handleCollectors(collector.check({channel_id: this.id, guild_id: this.guild_id || null}, options, "message"), 'collect')
        if (collectorVerification) {
            return Promise.resolve([])
        }

        let collectorInstance = collector.collect(this._bot, "message", {channel_id: this.id, guild_id: this.guild_id || null}, options)

        collectorInstance
        .once("done", () => this._bot._handleCollectors(collector.check({channel_id: this.id, guild_id: this.guild_id || null}, options, "message"), 'collect', true))
        .once("end", () => this._bot._handleCollectors(collector.check({channel_id: this.id, guild_id: this.guild_id || null}, options, "message"), 'collect', true))
        .once("error", () => this._bot._handleCollectors(collector.check({channel_id: this.id, guild_id: this.guild_id || null}, options, "message"), 'collect', true))

        return collectorVerification
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

module.exports = ChannelMessages