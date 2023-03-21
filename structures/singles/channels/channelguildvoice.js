const GuildVoice = require("../../bases/channels/guildvoice")
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
        return require("../../../methods/message").send(informations, options)
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
            require("../../../../methods/message").fetch_messages(informations, number)
            .catch(err => reject(err))
            .then(datas => {
                require("../../../../methods/channel").bulkdelete(informations, datas.map(msg => msg.id))
                .catch(err => reject(err))
                .then(vdatas => { return resolve(vdatas)})
            })
        })
    }
}
module.exports = Channel