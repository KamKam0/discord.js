class Channels{
    constructor(_bot, guildid){
        this.guild_id = guildid
        this.channels = []
        this._bot = _bot
    }

    type0(type){
        if(!isNaN(type)) return type
        else{
            const convert = require("../../constants").channels_type
            return convert[type]
        }
    }

    AddChannel(Channel){
        this.channels.push(new (require(`../Individual/Channels_/Channel_${this.type0(Channel.type)}`))({...Channel, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddChannels(Channels){
        this.channels.push(...Channels.map(ch => new (require(`../Individual/Channels_/Channel_${this.type0(ch.type)}`))({...ch, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot)))
        return this
    }

    DeleteChannel(ID){
        this.channels.splice(this.channels.indexOf(this.channels.find(ch => ch.id === ID)), 1)
        return this
    }

    DeleteChannels(IDS){
        IDS.forEach(ID => {
            this.channels.splice(this.channels.indexOf(this.channels.find(ch => ch.id === ID)), 1)
        })
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.channels.find(ba => ba.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result && result.parent_id) result.SetParent(this._bot.channels.get(result.parent_id))
            return result
        }else return this.channels.find(ba => ba.id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.channels.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                if(re.parent_id) re.SetParent(this._bot.channels.get(re.parent_id))
                return re
            })
            return result
        }else return this.channels.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.channels.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result && result.parent_id) result.SetParent(this._bot.channels.get(result.parent_id))
            return result
        }else return this.channels.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.channels.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                if(re.parent_id) re.SetParent(this._bot.channels.get(re.parent_id))
                return re
            }).map(filter)
        }else return this.channels.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.channels[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result && result.parent_id) result.SetParent(this._bot.channels.get(result.parent_id))
            return result
        }else return this.channels[position]
    }

    get length(){
        return this.channels.length
    }
}

module.exports = Channels