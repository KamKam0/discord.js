const Base = require("./baseMultiple")
class Channels extends Base{
    constructor(_bot){
        super(_bot)
    }

    #type0(type){
        if(!isNaN(type)) return type
        else{
            const convert = require("../../constants").channels_type
            return convert[type]
        }
    }

    AddChannel(Channel){
        this.channels.push(new (require(`../Individual/Channels_/Channel_${this.#type0(Channel.type)}`))({...Channel, token: this._bot.discordjs.token}, this._bot))
        return this
    }

    AddChannels(Channels){
        Channels.map(ch => this.AddChannel(ch))
        return this
    }

    DeleteChannel(ID){
        this.channels.splice(this.channels.indexOf(this.channels.find(ch => ch.id === ID)), 1)
        return this
    }

    DeleteChannels(IDS){
        IDS.forEach(ID => this.channels.splice(this.channels.indexOf(this.channels.find(ch => ch.id === ID)), 1))
        return this
    }
}

module.exports = Channels