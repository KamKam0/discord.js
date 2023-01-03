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
        return new Promise((resolve, reject) => {
            require("../../../../Classes/Collector")(this._bot, "message", {channel_id: this.id, guild_id: this.guild_id || null}, options)
            .then(datas => resolve(datas))
            .catch(datas => reject(datas))
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
        return require("../../../../Classes/Collector").collect(this._bot, "message", {channel_id: this.id, guild_id: this.guild_id || null}, options)
    }

    /**
     * 
     * @param {number} limit 
     * @returns 
     */
    fetchmessages(limit){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/message").fetch_messages(this.bot_token, this.id, limit, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
    
    /**
     * 
     * @param {string} ID 
     * @returns 
     */
    fetchmessage(ID){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/message").fetch_messages(this.bot_token, this.id, ID, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @returns 
     */
    getpins(){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").getpins(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @returns 
     */
    triggertyping(){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").triggertyping(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    send(options){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/message").send(this.bot_token, this.id, options, undefined, undefined, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {object[]} options 
     * @returns 
     */
    edit(options){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").modify(this.bot_token, this.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
}

module.exports = TextBase