const Base = require("./base")
class TextBase extends Base{
    constructor(channel, bot){
        super(channel)
        this._bot = bot
    }

    fetchmessages(limit){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/message").fetch_messages(this.bot_token, this.id, limit)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - fetchmessages, guildtext")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
    
    fetchmessage(ID){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/message").fetch_messages(this.bot_token, this.id, ID)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - fetchmessage, guildtext")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    getpins(){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").getpins(this.bot_token, this.id)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - getpins, guildtext")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    triggertyping(){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").triggertyping(this.bot_token, this.id)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - triggertyping, guildtext")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    send(options){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/message").send(this.bot_token, this.id, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - send, guildtext")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    edit(options){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").modify(this.bot_token, this.id, options, this._bot)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - edit, guildtext")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
}

module.exports = TextBase