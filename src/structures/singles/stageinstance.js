const BaseGuild = require("../bases/baseguild")
const stageMethod = require("../../methods/stages")

class StageInstance extends BaseGuild{
    constructor(stage, bot){
        super(stage, bot)
        this.id = stage.id
        this.channel_id = stage.channel_id
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.topic = stage.topic || null
        this.privacy_level = stage.privacy_level || null
        this.discoverable_disabled = stage.discoverable_disabled ?? false
    }

    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return stageMethod.modify(informations, options)
    }

    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return stageMethod.delete(informations)
    }
}
module.exports = StageInstance