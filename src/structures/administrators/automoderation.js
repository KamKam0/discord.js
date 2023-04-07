const Base = require("../bases/basemuldecla")
const automoderationMethod = require("../../methods/automoderation")

class AutoModerations extends Base{
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
        return automoderationMethod.create(informations, options)
    }

    getList(){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id
        }
        return automoderationMethod.getall(informations)
    }
}

module.exports = AutoModerations