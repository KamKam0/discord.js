const BaseAutoMod = require("../Gestionnaires/Multiple/AutoModerations")
class AutoModerations extends BaseAutoMod{
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
            require("../Methods/automoderation").create(this._bot.discordjs.token, this.guild_id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    getList(){
        return new Promise((resolve, reject) => {
            require("../Methods/automoderation").getall(this._bot.discordjs.token, this.guild_id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}

module.exports = AutoModerations