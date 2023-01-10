const Invite = require("../Individual/Invite")
const Base = require("./baseMultiple")
class Invites extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    __AddInvite(invite){
        this.container.push(new Invite({...invite, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    __AddInvites(invites){
        invites.map(inv => this.__AddInvite(inv))
        return this
    }
}

module.exports = Invites