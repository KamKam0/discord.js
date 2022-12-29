const BaseThreads = require("../Gestionnaires/Multiple/Threads")
class Threads extends BaseThreads{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    join(threadid){
        return new Promise((resolve, reject) => {
            require("../Methods/threads").jointhread(this._bot.token, threadid, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    createwithmessage(channelid, messageid, options){
        return new Promise((resolve, reject) => {
            require("../Methods/threads").create_withm(this._bot.token, channelid, messageid, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    createwithoutmessage(channelid, options){
        return new Promise((resolve, reject) => {
            require("../Methods/threads").create_withoutm(this._bot.token, channelid, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}

module.exports = Threads