const Base = require("./baseMultiple")
class Channels extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    #type0(type){
        if(!isNaN(type)) return type
        else{
            const convert = require("../../constants").channels_type
            return convert[type]
        }
    }

    AddChannel(Channel){
        this.container.push(new (require(`../Individual/Channels_/Channel_${this.#type0(Channel.type)}`))({...Channel, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddChannels(Channels){
        Channels.map(ch => this.AddChannel(ch))
        return this
    }

    DeleteChannel(ID){
        this.container.splice(this.container.indexOf(this.container.find(ch => ch.id === ID)), 1)
        return this
    }

    DeleteChannels(IDS){
        IDS.forEach(ID => this.container.splice(this.container.indexOf(this.container.find(ch => ch.id === ID)), 1))
        return this
    }
}

module.exports = Channels