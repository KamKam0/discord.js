const Base = require("./base")
class TextBase extends Base{
    constructor(channel, bot){
        super(channel, bot)
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
        return require("../../../../Classes/Collector")(this._bot, "message", {channel_id: this.id, guild_id: this.guild_id || null}, options)
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
        return require("../../../../Classes/Collector").collect(this._bot, "message", {channel_id: this.id, guild_id: this.guild_id || null}, options)
    }

    /**
     * 
     * @param {number} limit 
     * @returns 
     */
    async fetchMessages(limit){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../../../methods/message").fetch_messages(informations, limit)
    }
    
    /**
     * 
     * @param {string} ID 
     * @returns 
     */
    async fetchMessage(ID){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            message_id: ID
        }
        return require("../../../../methods/message").fetch_messages(informations)
    }

    /**
     * 
     * @returns 
     */
    async getPins(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../../../methods/channel").getpins(informations)
    }

    /**
     * 
     * @returns 
     */
    async triggerTyping(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../../../methods/channel").triggertyping(informations)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async send(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../../../methods/message").send(informations, options)
    }

    /**
     * 
     * @param {object[]} options 
     * @returns 
     */
    async edit(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../../../methods/channel").modify(informations, options)
    }
}

module.exports = TextBase