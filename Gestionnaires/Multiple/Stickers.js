const Sticker = require("../Individual/Sticker")
const Base = require("./baseMultiple")
class Stickers extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    AddSticker(sticker){
        this.container.push(new Sticker({...sticker, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddStickers(stickers){
        stickers.map(sti => this.AddSticker(sti))
        return this
    }

    DeleteSticker(ID){
        this.container.splice(this.container.indexOf(this.container.find(sti => sti.id === ID)), 1)
        return this
    }
}

module.exports = Stickers