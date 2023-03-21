const BaseEmojis = require("../managers/emojis")
class Emojis extends BaseEmojis{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    /**
     * 
     * @param {string} name 
     * @param {buffer} imagedata 
     * @param {object[]} roles 
     * @returns 
     */
    create(name, imagedata, roles){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id
        }
        return require("../methods/emoji").create(informations, name, imagedata, roles)
    }
}

module.exports = Emojis