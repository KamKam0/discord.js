const Event = require("../Individual/Event")
class Events{
    constructor(_bot, guildid){
        this.guild_id = guildid
        this.events = []
        this._bot = _bot
    }

    AddEvent(event){
        this.events.push(new Event({...event, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddEvents(events){
        this.events.push(...events.map(ev => new Event({...ev, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot)))
        return this
    }

    DeleteEvent(ID){
        this.events.splice(this.events.indexOf(this.events.find(ev => ev.id === ID)), 1)
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.events.find(ba => ba.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetCreator(this._bot.guilds.get(result.creator_id))
            return result
        }else return this.events.find(ba => ba.id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.events.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetCreator(this._bot.guilds.get(re.creator_id))
                return re
            })
            return result
        }else return this.events.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.events.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetCreator(this._bot.guilds.get(result.creator_id))
            return result
        }else return this.events.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.events.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetCreator(this._bot.guilds.get(re.creator_id))
                return re
            }).map(filter)
        }else return this.events.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.events[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetCreator(this._bot.guilds.get(result.creator_id))
            return result
        }else return this.events[position]
    }

    get length(){
        return this.events.length
    }
}

module.exports = Events