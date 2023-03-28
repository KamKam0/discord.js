const BaseStage = require("../managers/stageinstances")
const stageMethod  = require("../../methods/stages")

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
        return stageMethod.create(informations, options)
    }

    modify(id, options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            id
        }
        return stageMethod.modify(informations, options)
    }

    delete(id){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id
        }
        return stageMethod.delete(informations)
    }
}

module.exports = StageInstances