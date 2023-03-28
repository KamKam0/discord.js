const BaseTemplate = require("../managers/templates")
const templateMethod = require("../../methods/template")

class Commands extends BaseTemplate{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    create(options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id
        }
        return templateMethod.create(informations, options)
    }

    sync(code){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            code
        }
        return templateMethod.sync(informations)
    }

    modify(code, options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            code
        }
        return templateMethod.modify(informations, options)
    }

    delete(code){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            guild_id: this.guild_id,
            code
        }
        return templateMethod.delete(informations)
    }

    fetchAll(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            guild_id: this.guild_id
        }
        return templateMethod.getall(informations)
    }

    fetchByCode(code){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            guild_id: this.guild_id,
            code
        }
        return templateMethod.get(informations)
    }
}

module.exports = Commands