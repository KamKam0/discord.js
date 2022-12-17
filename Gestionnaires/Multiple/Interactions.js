const Interaction = require("../Individual/Interaction")
class Interactions{
    constructor(_bot){
        this.interactions = []
        this._bot = _bot
    }

    AddInteraction(int){
        if(this._bot) this.interactions.push(new Interaction({...int, token: this._bot.discordjs.token}))
        else this.interactions.push(new Interaction(int))
        return this
    }

    AddInteractions(interactions){
        if(this._bot) this.interactions.push(...interactions.map(int => new Interaction({...int, token: this._bot.discordjs.token})))
        else this.interactions.push(...interactions.map(int => new Interaction(int)))
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.interactions.find(ba => ba.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetMember(result.guild.members.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            return result
        }else return this.interactions.find(ba => ba.id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.interactions.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetMember(re.guild.members.get(re.guild_id))
                re.SetUser(this._bot.users.get(re.user_id))
                return re
            })
            return result
        }else return this.interactions.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.interactions.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetMember(result.guild.members.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            return result
        }else return this.interactions.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.interactions.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetMember(re.guild.members.get(re.guild_id))
                re.SetUser(this._bot.users.get(re.user_id))
                return re
            }).map(filter)
        }else return this.interactions.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.interactions[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetMember(result.guild.members.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            return result
        }else return this.interactions[position]
    }

    get length(){
        return this.interactions.length
    }
}

module.exports = Interactions