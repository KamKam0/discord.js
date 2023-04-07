const BaseRole = require("../managers/roles")
const roleMethod = require("../../methods/role")

class Roles extends BaseRole{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    create(options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id
        }
        return roleMethod.create(informations, options)
    }

    modify(id, options){
        let role = this.get(id)
        if(!role) return Promise.reject("No role found")
        return role.modify(options)
    }

    delete(id, options){
        let role = this.get(id)
        if(!role) return Promise.reject("No role found")
        return role.delete(options)
    }

    changePositions(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            guild_id: this.guild_id
        }
        return roleMethod.changepositions(informations, options)
    }
}

module.exports = Roles