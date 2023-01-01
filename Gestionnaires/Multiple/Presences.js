const Presence = require("../Individual/Presence")
const Base = require("./baseMultiple")
class Presences extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    Treat(presence){
        if(this.get(presence.user_id)) this.get(presence.user_id).Modify_Datas(presence)
        else this.AddPresence(presence)
    }

    AddPresence(presence){
        this.container.push(new Presence({...presence, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddPresences(presences){
        presences.map(pr => this.AddPresence(pr))
        return this
    }

    DeletePresence(id, ID){
        this.container.splice(this.container.indexOf(this.container.find(pr => pr.user_id === ID && pr.guild_id === id)), 1)
        return this
    }
}

module.exports = Presences