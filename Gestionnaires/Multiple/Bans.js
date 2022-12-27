const Ban = require("../Individual/Ban")
class Bans{
    constructor(_bot){
        this.bans = []
        this._bot = _bot
    }

    get(ID){
        if(this._bot){
            let result = this.bans.find(ba => ba.user.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.bans.find(ba => ba.id === ID)
    }

    AddBan(ban){
        this.bans.push(new Ban({...ban, token: this._bot.discordjs.token}, this._bot))
        return this
    }

    AddBans(bans){
        this.bans.push(...bans.map(ba => new Ban({...ba, token: this._bot.discordjs.token}, this._bot)))
        return this
    }

    filter(filter){
        if(this._bot){
            let result = this.bans.filter(filter)
            result = result.map(re => re.SetGuild(this._bot.guilds.get(re.guild_id)))
            return result
        }else return this.bans.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.bans.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.bans.find(filter)
    }

    map(filter){
        if(this._bot) return this.bans.map(re => re.SetGuild(this._bot.guilds.get(re.guild_id))).map(filter)
        else return this.bans.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.bans[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.bans[position]
    }

    get length(){
        return this.bans.length
    }
}

module.exports = Bans