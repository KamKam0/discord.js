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
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            id
        }
        return roleMethod.modify(informations, options)
    }

    delete(id){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            guild_id: this.guild_id,
            id
        }
        return roleMethod.delete(informations)
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