const BaseEmojis = require("../managers/emojis")
const emojiMethod = require("../../methods/emoji")

class Emojis extends BaseEmojis{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }
    
    create(name, imagedata, roles){//"data:image/png;base64,"+fs.readFileSync('../debit.png', 'base64')
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id
        }
        return emojiMethod.create(informations, name, imagedata, roles)
    }

    modify(id, options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            id
        }
        return emojiMethod.modify(informations, options)
    }

    delete(id){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            id
        }
        return emojiMethod.delete(informations)
    }
}

module.exports = Emojis