const BaseGuild = require("../bases/baseguild")
const stickerMethod = require("../../methods/sticker")

class Sticker extends BaseGuild{
    constructor(sticker, bot){
        super(sticker, bot)
        this.id = sticker.id
        this.pack_id = sticker.pack_id || null
        this.name = sticker.name
        this.description = sticker.description || null
        this.tags = sticker.tags || []
        this.asset = sticker.asset || null
        this.type = sticker.type || null
        this.format_type = sticker.format_type || null
        this.available = sticker.available ?? false
        this.sort_value = sticker.sort_value || null
    }
    
    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return stickerMethod.modify(informations, options)
    }
    
    async delete(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return stickerMethod.delete(informations), options
    }
}
module.exports = Sticker