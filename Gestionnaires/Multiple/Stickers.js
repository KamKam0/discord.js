const Sticker = require("../Individual/Sticker")
const Base = require("./baseMultiple")
class Stickers extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    __AddSticker(sticker){
        this.container.push(new Sticker({...sticker, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    __AddStickers(stickers){
        stickers.map(sti => this.__AddSticker(sti))
        return this
    }

    __DeleteSticker(ID){
        this.container.splice(this.container.indexOf(this.container.find(sti => sti.id === ID)), 1)
        return this
    }
}

module.exports = Stickers