const GuildVoice = require("./Bases/guildVoice")
class Channel extends GuildVoice{
    constructor(channel, bot){
        super(channel, bot)
    }
    
    /**
     * 
     * @param {object} options 
     * @returns 
     */
    send(options){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/message").send(this.bot_token, this.id, options, undefined, undefined, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {number} limit 
     * @returns 
     */
    fetchmessages(limit){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/message").fetch_messages(this.bot_token, this.id, limit, this._bot)
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
            require("../../../Methods/message").fetch_messages(this.bot_token, this.id, ID, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
    
    /**
     * 
     * @param {number} number 
     * @returns 
     */
    bulkdelete(number){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/message").fetch_messages(this.bot_token, this.id, number, this._bot)
            .catch(err => reject(err))
            .then(datas => {
                require("../../../Methods/channel").bulkdelete(this.bot_token, this.id, datas.map(msg => msg.id), this._bot)
                .catch(err => reject(err))
                .then(vdatas => { return resolve(vdatas)})
            })
        })
    }
}
module.exports = Channel