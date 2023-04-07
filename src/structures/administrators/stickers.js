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
    create(options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id
        }
        return stickerMethod.create(informations, options)
    }
    
    async modify(id, options){
        let sticker = this.get(id)
        if(!sticker) return Promise.reject("No sticker found")
        return sticker.modify(options)
    }
    
    async delete(id, options){
        let sticker = this.get(id)
        if(!sticker) return Promise.reject("No sticker found")
        return sticker.delete(options)
    }
}

module.exports = Stickers