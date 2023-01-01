const Ban = require("../Individual/Ban")
const Base = require("./baseMultiple")
class Bans extends Base{
    constructor(_bot, guild_id){
        super(_bot, guild_id)
    }

    AddBan(ban){
        this.container.push(new Ban({...ban, token: this._bot.discordjs.token}, this._bot))
        return this
    }

    AddBans(bans){
        bans.map(ba => this.AddBan(ba))
        return this
    }
}

module.exports = Bans