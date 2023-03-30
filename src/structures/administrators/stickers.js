const BaseStage = require("../managers/stickers")
const stickerMethod = require("../../methods/sticker")

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
        return stickerMethod.create(informations, name, file, tags, description)
    }
    
    async modify(id, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id,
            guild_id: this.guild_id
        }
        return stickerMethod.modify(informations, options)
    }
    
    async delete(id){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id,
            guild_id: this.guild_id
        }
        return stickerMethod.delete(informations)
    }
}

module.exports = Stickers