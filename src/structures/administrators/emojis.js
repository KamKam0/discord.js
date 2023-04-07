const BaseEmojis = require("../managers/emojis")
const emojiMethod = require("../../methods/emoji")

class Emojis extends BaseEmojis{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }
    
    create(options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id
        }
        return emojiMethod.create(informations, options)
    }

    modify(id, options){
        let emoji = this.get(id)
        if(!emoji) return Promise.reject("No emoji found")
        return emoji.modify(options)
    }

    delete(id, options){
        let emoji = this.get(id)
        if(!emoji) return Promise.reject("No emoji found")
        return emoji.delete(options)
    }
}

module.exports = Emojis