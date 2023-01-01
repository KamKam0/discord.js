const Role = require("../Individual/Role")
const Base = require("./baseMultiple")
class Roles extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    AddRole(role){
        this.container.push(new Role({...role, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddRoles(Roles){
        Roles.map(ro => this.AddRole(ro))
        return this
    }

    DeleteRole(ID){
        this.container.splice(this.container.indexOf(this.container.find(ro => ro.id === ID)), 1)
        return this
    }
}

module.exports = Roles