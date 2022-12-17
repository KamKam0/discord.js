const Role = require("../Individual/Role")
class Roles{
    constructor(_bot, guildid){
        this.guild_id = guildid
        this.roles = []
        this._bot = _bot
    }

    AddRole(role){
        if(this._bot) this.roles.push(new Role({...role, token: this._bot.discordjs.token, guild_id: this.guild_id}))
        else this.roles.push(new Role({...role, guild_id: this.guild_id}))
        return this
    }

    AddRoles(Roles){
        if(this._bot) this.roles.push(...Roles.map(ro => new Role({...ro, token: this._bot.discordjs.token, guild_id: this.guild_id})))
        else this.roles.push(...Roles.map(ro => new Role({...ro, guild_id: this.guild_id})))
        return this
    }

    DeleteRole(ID){
        this.roles.splice(this.roles.indexOf(this.roles.find(ro => ro.id === ID)), 1)
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.roles.find(ba => ba.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.roles.find(ba => ba.id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.roles.filter(filter)
            result = result.map(re => re.SetGuild(this._bot.guilds.get(re.guild_id)))
            return result
        }else return this.roles.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.roles.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.roles.find(filter)
    }

    map(filter){
        if(this._bot) return this.roles.map(re => re.SetGuild(this._bot.guilds.get(re.guild_id))).map(filter)
        else return this.roles.map(filter)
        
    }

    select(position){
        if(this._bot){
            let result = this.roles[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.roles[position]
    }

    get length(){
        return this.roles.length
    }
}

module.exports = Roles