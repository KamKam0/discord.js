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
        let stageInstance = this.get(id)
        if(!stageInstance) return Promise.reject("No stageInstance found")
        return stageInstance.modify(options)
    }

    delete(id, options){
        let stageInstance = this.get(id)
        if(!stageInstance) return Promise.reject("No stageInstance found")
        return stageInstance.delete(options)
    }
}

module.exports = StageInstances