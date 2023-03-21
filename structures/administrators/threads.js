const BaseThreads = require("../managers/threads")
class Threads extends BaseThreads{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    /**
     * 
     * @param {string} threadid 
     * @returns 
     */
    join(threadid){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: threadid
        }
        return require("../methods/threads").jointhread(informations)
    }

    /**
     * 
     * @param {string} channelid 
     * @param {string} messageid 
     * @param {object} options 
     * @returns 
     */
    createWithMessage(channelid, messageid, options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: channelid,
            message_id: messageid
        }
        return require("../methods/threads").create_withm(informations, options)
    }

    /**
     * 
     * @param {string} channelid 
     * @param {object} options 
     * @returns 
     */
    createWithoutMessage(channelid, options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: channelid
        }
        return require("../methods/threads").create_withoutm(informations, options)
    }
}

module.exports = Threads