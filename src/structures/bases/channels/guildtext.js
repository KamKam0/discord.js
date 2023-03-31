const GuildBase = require("./baseguild")
const messageMethod = require("../../../methods/message")
const channelMethod = require("../../../methods/channel")
const collector = require("../../../handlers/collector")

class guildText extends GuildBase{
    constructor(channel, bot){
        super(channel, bot)
        this.rate_limit_per_user = channel.rate_limit_per_user || 0
    }

    /**
     * 
     * @param {number} number 
     * @returns 
     */
    bulkDelete(number){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            channel_id: this.id
        }
        return new Promise(async (resolve, reject) => {
            messageMethod.fetch_messages(informations, number)
            .catch(err => reject(err))
            .then(datas => {
                channelMethod.bulkdelete(informations, datas.map(msg => msg.id))
                .catch(err => reject(err))
                .then(vdatas => resolve(vdatas))
            })
        })
    }

    /**
     * 
     * @param {string} targetid 
     * @returns 
     */
    async followNewsChannel(targetid){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return channelMethod.follownews(informations, targetid)
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
     * @param {number} limit 
     * @returns 
     */
    async fetchMessages(limit){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            channel_id: this.id
        }
        return messageMethod.fetch_messages(informations, limit)
    }
    
    /**
     * 
     * @param {string} id 
     * @returns 
     */
    async fetchMessage(id){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id,
            channel_id: this.id
        }
        return messageMethod.fetch_message(informations)
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
        return channelMethod.getpins(informations)
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
        return channelMethod.triggertyping(informations)
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
            channel_id: this.id
        }
        return messageMethod.send(informations, options)
    }
    
}

module.exports = guildText