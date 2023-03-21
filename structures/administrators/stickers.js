const BaseStage = require("../managers/stickers")
class Stickers extends BaseStage{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }
    
    /**
     * 
     * @param {string} name 
     * @param {buffer} file 
     * @param {object[]} tags 
     * @param {string} description 
     * @returns 
     */
    create(name, file, tags, description){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id
        }
        return require("../methods/stickers").create(informations, name, file, tags, description)
    }
}

module.exports = Stickers