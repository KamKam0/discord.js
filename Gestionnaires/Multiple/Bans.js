const Ban = require("../Individual/Ban")
const Base = require("./baseMultiple")
class Bans extends Base{
    constructor(_bot, guild_id){
        super(_bot, guild_id)
    }

    __AddBan(ban){
        this.container.push(new Ban({...ban, token: this._bot.discordjs.token}, this._bot))
        return this
    }

    __AddBans(bans){
        bans.map(ba => this.__AddBan(ba))
        return this
    }
}

module.exports = Bans