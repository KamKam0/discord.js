const BaseStage = require("../Gestionnaires/Multiple/StageInstances")
class StageInstances extends BaseStage{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    create(options){
        return new Promise(async (resolve, reject) => {
            require("../Methods/stages").create(this._bot.discordjs.token, this.guild_id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
}

module.exports = StageInstances