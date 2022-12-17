const Presence = require("../Individual/Presence")
class Presences{
    constructor(_bot, guildid){
        this.guild_id = guildid
        this.presences = []
        this._bot = _bot
    }

    Treat(presence){
        if(this.get(presence.user_id)) this.get(presence.user_id).Modify_Datas(presence)
        else this.AddPresence(presence)
    }

    AddPresence(presence){
        if(this._bot) this.presences.push(new Presence({...presence, token: this._bot.discordjs.token, guild_id: this.guild_id}))
        else this.presences.push(new Presence({...presence, guild_id: this.guild_id}))
        return this
    }

    AddPresences(presences){
        if(this._bot) this.presences.push(...presences.map(pr => new Presence({...pr, token: this._bot.discordjs.token, guild_id: this.guild_id})))
        else this.presences.push(...presences.map(pr => new Presence({...pr, guild_id: this.guild_id})))
        return this
    }

    DeletePresence(id, ID){
        this.presences.splice(this.presences.indexOf(this.presences.find(pr => pr.user_id === ID && pr.guild_id === id)), 1)
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.presences.find(ba => ba.user_id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            return result
        }else return this.presences.find(ba => ba.user_id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.presences.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetUser(this._bot.users.get(re.user_id))
                return re
            })
            return result
        }else return this.presences.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.presences.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            return result
        }else return this.presences.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.presences.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetUser(this._bot.users.get(re.user_id))
                return re
            }).map(filter)
        }else return this.presences.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.presences[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            return result
        }else return this.presences[position]
    }

    get length(){
        return this.presences.length
    }
}

module.exports = Presences