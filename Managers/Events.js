const BaseEvents = require("../Gestionnaires/Multiple/Events")
class Events extends BaseEvents{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    create(options){
        return new Promise((resolve, reject) => {
            require("../Methods//events").create(this._bot.token, this.guild_id, options, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - create, events manager")
                er.content = err
                reject(er)
            })
        })
    }
}

module.exports = Events