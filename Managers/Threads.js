const BaseThreads = require("../Gestionnaires/Multiple/Threads")
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
        return new Promise((resolve, reject) => {
            require("../Methods/threads").jointhread(this._bot.discordjs.token, threadid, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {string} channelid 
     * @param {string} messageid 
     * @param {object} options 
     * @returns 
     */
    createwithmessage(channelid, messageid, options){
        return new Promise((resolve, reject) => {
            require("../Methods/threads").create_withm(this._bot.discordjs.token, channelid, messageid, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {string} channelid 
     * @param {object} options 
     * @returns 
     */
    createwithoutmessage(channelid, options){
        return new Promise((resolve, reject) => {
            require("../Methods/threads").create_withoutm(this._bot.discordjs.token, channelid, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}

module.exports = Threads