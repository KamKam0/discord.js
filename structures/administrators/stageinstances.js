const BaseStage = require("../managers/stageinstances")
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
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id
        }
        return require("../methods/stages").create(informations, options)
    }
}

module.exports = StageInstances