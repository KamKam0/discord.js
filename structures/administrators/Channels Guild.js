const BaseChannel = require("../Gestionnaires/Multiple/Channels")
class Channels extends BaseChannel{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    create(options){
        return new Promise((resolve, reject) => {
            require("../methods/channel").create(this._bot.discordjs.token, this.guild_id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}

module.exports = Channels