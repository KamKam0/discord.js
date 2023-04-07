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
        let event = this.get(id)
        if(!event) return Promise.reject("No event found")
        return event.modify(options)
    }

    delete(id, options){
        let event = this.get(id)
        if(!event) return Promise.reject("No event found")
        return event.delete(options)
    }
    
    /**
    * @param {object} [queryParams] 
    * @param {string} [queryParams.before] ID
    * @param {string} [queryParams.after] ID
    * @param {number} [queryParams.limit] 
    * @param {boolean} [queryParams.with_member] 
    * @returns 
    */
    getUsers(id, queryParams){
        let event = this.get(id)
        if(!event) return Promise.reject("No event found")
        return event.getUsers(queryParams)
    }
}

module.exports = Events