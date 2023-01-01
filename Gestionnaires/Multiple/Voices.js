const Voice = require("../Individual/Voice")
const Base = require("./baseMultiple")
class Voices extends Base{
    constructor(bot, guildid){
        super(bot, guildid)
    }

    AddVoice(voice){
        this.container.push(new Voice({...voice, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddVoices(voices){
        voices.map(vo => this.AddVoice(vo))
        return this
    }

    DeleteVoice(ID){
        this.container.splice(this.container.indexOf(this.container.find(vo => vo.user_id === ID)), 1)
        return this
    }

    get(ID){
        return this.container.find(ba => ba.user_id === ID)
    }
}

module.exports = Voices