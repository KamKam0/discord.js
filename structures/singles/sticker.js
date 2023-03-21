const BaseGuild = require("../bases/baseguild")
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

    _Modify_Datas(sticker){
        let tocheck = Object.entries(sticker)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        this._Modify_Get_Datas()
        return this
    }
    
    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return require("../../methods/stickers").modify(informations, options)
    }
    
    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return require("../../methods/stickers").delete(informations)
    }
}
module.exports = Sticker