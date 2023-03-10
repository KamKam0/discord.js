const BaseRole = require("../Gestionnaires/Multiple/Roles")
class Roles extends BaseRole{
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
            require("../Methods/roles").create(this._bot.discordjs.token, this.guild_id, options), this._bot
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}

module.exports = Roles