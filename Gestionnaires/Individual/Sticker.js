const Base = require("./base")
class Sticker extends Base{
    constructor(sticker, bot){
        super(bot)
        this.id = sticker.id
        this.pack_id = sticker.pack_id || null
        this.name = sticker.name
        this.description = sticker.description || null
        this.tags = sticker.tags || []
        this.asset = sticker.asset || null
        this.type = sticker.type || null
        this.format_type = sticker.format_type || null
        this.available = sticker.available ?? false
        this.guild = sticker.guild || bot.guilds.get(sticker.guild_id) || null
        this.guild_id = sticker.guild_id
        this.sort_value = sticker.sort_value || null
    }

    __Modify_Datas(sticker){
        let tocheck = Object.entries(sticker)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        this.__Modify_Get_Datas()
        return this
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    modify(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/stickers").modify(this.bot_token, this.guild_id, this.id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/stickers").delete(this.bot_token, this.guild_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}
module.exports = Sticker