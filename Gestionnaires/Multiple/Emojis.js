const Emoji = require("../Individual/Emoji")
const Base = require("./baseMultiple")
class Emojis extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    AddEmoji(emoji){
        this.container.push(new Emoji({...emoji, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddEmojis(emojis){
        emojis.map(emo => this.AddEmoji(emo))
        return this
    }

    DeleteEmoji(ID){
        this.container.splice(this.container.indexOf(this.container.find(emo => emo.id === ID)), 1)
        return this
    }
}

module.exports = Emojis