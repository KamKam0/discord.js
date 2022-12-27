const BaseChannel = require("../Gestionnaires/Multiple/Channels Guild")
class Channels extends BaseChannel{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    create(options){
        return new Promise((resolve, reject) => {
            require("../Methods/channel").create(this._bot.token, this.guild_id, options, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - create, channel guild")
                er.content = err
                reject(er)
            })
        })
    }
}

module.exports = Channels