const BaseEvents = require("../managers/events")
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
        return require("../methods//events").create(informations, options)
    }
}

module.exports = Events