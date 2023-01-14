const AutoModeation = require("../Individual/AutoModeration")
const Base = require("./baseMultiple")
class AutoMods extends Base{
    constructor(_bot, guild_id){
        super(_bot, guild_id)
    }

    __AddAutoModeation(auto){
        this.container.push(new AutoModeation({...auto, token: this._bot.discordjs.token}, this._bot))
        return this
    }

    __AddAutoModeations(autos){
        autos.map(auto => this.__AddAutoModeation(auto))
        return this
    }
}

module.exports = AutoMods