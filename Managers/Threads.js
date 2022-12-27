const BaseThreads = require("../Gestionnaires/Multiple/Threads")
class Threads extends BaseThreads{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    join(threadid){
        return new Promise((resolve, reject) => {
            require("../Methods/threads").jointhread(this._bot.token, threadid, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - join, threads manager")
                er.content = err
                reject(er)
            })
        })
    }

    createwithmessage(channelid, messageid, options){
        return new Promise((resolve, reject) => {
            require("../Methods/threads").create_withm(this._bot.token, channelid, messageid, options, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - createwithmessage, threads manager")
                er.content = err
                reject(er)
            })
        })
    }

    createwithoutmessage(channelid, options){
        return new Promise((resolve, reject) => {
            require("../Methods/threads").create_withoutm(this._bot.token, channelid, options, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - createwithoutmessage, threads manager")
                er.content = err
                reject(er)
            })
        })
    }
}

module.exports = Threads