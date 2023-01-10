const Guild = require("../Individual/Guild")
const Base = require("./baseMultiple")
class Guilds extends Base{
    constructor(_bot){
        super(_bot)
    }

    __AddGuild(guild){
        this.container.push(new Guild(this._bot, guild))
        return this
    }

    __DeleteGuild(ID){
        this.container.splice(this.container.indexOf(this.container.find(gu => gu.id === ID)), 1)
        return this
    }

    __DeleteGuilds(IDS){
        IDS.map(gu => this.__DeleteChannel(gu))
        return this
    }

    __ReplaceGuild(guild){
        let voice = this.get(guild.id).voice
        this.container.splice(this.container.indexOf(this.container.find(gu => gu.id === guild.id)), 1)
        this.container.push(new Guild(this._bot, guild), voice)
        return this
    }
}

module.exports = Guilds