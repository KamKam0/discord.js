const Base = require("../bases/basemultiple")
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

    _add(Channel){
        this.container.push(new (require(`../Individual/Channels_/Channel_${this.#type0(Channel.type)}`))({...Channel, token: this._bot.discordjs.token}, this._bot))
        return this
    }

    _addMultiple(Channels){
        Channels.map(ch => this._add(ch))
        return this
    }

    _delete(ID){
        this.container.splice(this.container.indexOf(this.container.find(ch => ch.id === ID)), 1)
        return this
    }

    _deleteMultiple(IDS){
        IDS.map(ch => this._delete(ch))
        return this
    }
}

module.exports = Channels