const Emoji = require("../Individual/Emoji")
const Base = require("./baseMultiple")
class Emojis extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    __AddEmoji(emoji){
        this.container.push(new Emoji({...emoji, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    __AddEmojis(emojis){
        emojis.map(emo => this.__AddEmoji(emo))
        return this
    }

    __DeleteEmoji(ID){
        this.container.splice(this.container.indexOf(this.container.find(emo => emo.id === ID)), 1)
        return this
    }
}

module.exports = Emojis