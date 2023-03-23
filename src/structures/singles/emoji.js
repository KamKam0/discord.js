const Base = require("../bases/baseguild")
const emojiMethod = require("../../methods/emoji")

class Emoji extends Base{
    constructor(emoji, bot){
        super(emoji, bot)
        this.id = emoji.id
        this.name = emoji.name
        this.roles_ids = emoji.roles || []
        this.require_colons = emoji.require_colons || null
        this.managed = emoji.managed ?? false
        this.animated = emoji.animated ?? false
        this.available = emoji.available ?? true
    }

    _Modify_Datas(emoji){
        let tocheck = Object.entries(emoji)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        this._modifyGetDatas()
        return this
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return emojiMethod.modify(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return emojiMethod.delete(informations)
    }
}
module.exports = Emoji