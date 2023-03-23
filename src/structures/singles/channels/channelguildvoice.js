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
            id: this.id
        }
        return messageMethod.send(informations, options)
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
        return messageMethod.fetch_messages(informations, limit)
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
        return messageMethod.fetch_messages(informations)
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
            id: this.id
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
}
module.exports = Channel