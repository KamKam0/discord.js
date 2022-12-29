const BaseEvents = require("../Gestionnaires/Multiple/Events")
class Events extends BaseEvents{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    create(options){
        return new Promise((resolve, reject) => {
            require("../Methods//events").create(this._bot.discordjs.token, this.guild_id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}

module.exports = Events