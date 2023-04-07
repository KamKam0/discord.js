const GuildBase = require("./baseguild")
const messageMethod = require("../../../methods/message")
const channelMethod = require("../../../methods/channel")
const pinsAdministrator = require("../../administrators/pins")
const channelMessageAdministrator = require("../../administrators/channels/channelmessages")

class guildText extends GuildBase{
    constructor(channel, bot){
        super(channel, bot)
        this.rate_limit_per_user = channel.rate_limit_per_user || 0
        this.pins = new pinsAdministrator(bot, this.id)
        this.messages = new channelMessageAdministrator(bot, this.guild_id, this.id)
    }

    /**
     * 
     * @param {number} number 
     * @returns 
     */
    bulkDelete(number, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            channel_id: this.id
        }
        return new Promise(async (resolve, reject) => {
            let datas = await this.fetchMessages(informations, number).catch(err => reject(err))
            if(!datas) return
            let bulkDatas = await channelMethod.bulkdelete(informations, {payload: datas.map(msg => msg.id), ...options}).catch(err => reject(err))
            if(!bulkDatas) return
            return resolve(bulkDatas)
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