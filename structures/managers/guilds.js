const Guild = require("../singles/guild")
const Base = require("../bases/basemultiple")
class Guilds extends Base{
    constructor(_bot){
        super(_bot, null, "guild")
    }

    _ReplaceGuild(guild){
        this.container.splice(this.container.indexOf(this.container.find(gu => gu.id === guild.id)), 1)
        this.container.push(new Guild(this._bot, guild))
        return this
    }
}

module.exports = Guilds