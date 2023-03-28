const BaseEvents = require("../managers/events")
const eventMethod = require("../../methods/event")

class Events extends BaseEvents{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    create(options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id
        }
        return eventMethod.create(informations, options)
    }

    modify(id, options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            id
        }
        return eventMethod.modify(informations, options)
    }

    delete(id){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            guild_id: this.guild_id,
            id
        }
        return eventMethod.delete(informations)
    }

    getUsers(id){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            guild_id: this.guild_id,
            id
        }
        return eventMethod.getusers(informations)
    }
}

module.exports = Events