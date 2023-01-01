const StageInstance = require("../Individual/StageInstance")
const Base = require("./baseMultiple")
class StageInstances extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    AddStage(stage){
        this.container.push(new StageInstance({...stage, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddStages(stages){
        stages.map(sta => this.AddStage(sta))
        return this
    }

    DeleteStage(ID){
        this.container.splice(this.container.indexOf(this.container.find(sta => sta.id === ID)), 1)
        return this
    }
}

module.exports = StageInstances