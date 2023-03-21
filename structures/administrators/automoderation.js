const BaseAutoMod = require("../managers/automoderations")
class AutoModerations extends BaseAutoMod{
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
        return require("../methods/automoderation").create(informations, options)
    }

    getList(){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id
        }
        return require("../methods/automoderation").getall(informations)
    }
}

module.exports = AutoModerations