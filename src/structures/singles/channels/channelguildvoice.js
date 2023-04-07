const GuildVoice = require("../../bases/channels/guildvoice")
const messageMethod = require("../../../methods/message")
const channelMethod = require("../../../methods/channel")

class Channel extends GuildVoice{
    constructor(channel, bot){
        super(channel, bot)
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

    /**
     * 
     * @param {object} [queryParams] 
     * @param {string} [queryParams.before] ID
     * @param {string} [queryParams.after] ID
     * @param {number} [queryParams.limit] 
     * @param {string} [queryParams.around] ID
     * @returns 
     */
    async fetchMessages(queryParams){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            channel_id: this.id
        }
        return messageMethod.fetch_messages(informations, queryParams)
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
            let datas = await this.fetchMessages(informations, number).catch(err => reject(err))
            if(!datas) return
            let bulkDatas = await channelMethod.bulkdelete(informations, {payload: datas.map(msg => msg.id), ...options}).catch(err => reject(err))
            if(!bulkDatas) return
            return resolve(bulkDatas)
        })
    }
}
module.exports = Channel