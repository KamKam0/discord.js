const Guild = require("../Individual/Guild")
const Base = require("./baseMultiple")
class Guilds extends Base{
    constructor(_bot){
        super(_bot, null, "guild")
    }

    __ReplaceGuild(guild){
        let voice = this.get(guild.id).voice
        this.container.splice(this.container.indexOf(this.container.find(gu => gu.id === guild.id)), 1)
        this.container.push(new Guild(this._bot, guild), voice)
        return this
    }
}

module.exports = Guilds