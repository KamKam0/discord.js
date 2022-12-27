const Integration = require("../Individual/Integration")
class Integrations{
    constructor(_bot){
        this.integrations = []
        this._bot = _bot
    }

    AddIntegration(integration){
        this.integrations.push(new Integration({...integration, token: this._bot.discordjs.token}, this._bot))
        return this
    }

    AddIntegrations(integrations){
        this.integrations.push(...integrations.map(int => new Integration({...int, token: this._bot.discordjs.token}, this._bot)))
        return this
    }

    DeleteIntegration(ID){
        this.integrations.splice(this.integrations.indexOf(this.integrations.find(int => int.id === ID)), 1)
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.integrations.find(ba => ba.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetRole(this._bot.guilds.get(result.guild_id).roles.get(result.role_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            return result
        }else return this.integrations.find(ba => ba.id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.integrations.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetRole(this._bot.guilds.get(re.guild_id).roles.get(re.role_id))
                re.SetUser(this._bot.users.get(re.user_id))
                return re
            })
            return result
        }else return this.integrations.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.integrations.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetRole(this._bot.guilds.get(result.guild_id).roles.get(result.role_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            return result
        }else return this.integrations.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.integrations.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetRole(this._bot.guilds.get(re.guild_id).roles.get(re.role_id))
                re.SetUser(this._bot.users.get(re.user_id))
                return re
            }).map(filter)
        }else return this.integrations.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.integrations[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetRole(this._bot.guilds.get(result.guild_id).roles.get(result.role_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            return result
        }else return this.integrations[position]
    }

    get length(){
        return this.integrations.length
    }
}

module.exports = Integrations