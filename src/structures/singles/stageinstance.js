const BaseGuild = require("../bases/baseguild")
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

    _Modify_Datas(stage){
        let tocheck = Object.entries(stage)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        this._Modify_Get_Datas()
        return this
    }

    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return require("../../methods/stages").modify(informations, options)
    }

    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return require("../../methods/stages").delete(informations)
    }
}
module.exports = StageInstance