const Member = require("../Individual/Member")
class Members{
    constructor(_bot, guildid){
        this.guild_id = guildid
        this.members = []
        this._bot = _bot
    }

    AddMember(member){
        if(this._bot) this.members.push(new Member({...member, token: this._bot.discordjs.token, guild_id: this.guild_id}))
        else this.members.push(new Member({...member, guild_id: this.guild_id}))
        return this
    }

    AddMembers(members){
        if(this._bot) this.members.push(...members.map(me => new Member({...me, token: this._bot.discordjs.token, guild_id: this.guild_id})))
        else this.members.push(...members.map(me => new Member({...me, guild_id: this.guild_id})))
        return this
    }

    DeleteMember(ID){
        this.members.splice(this.members.indexOf(this.members.find(me => me.user.id === ID)), 1)
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.members.find(ba => ba.user_id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            return result
        }else return this.members.find(ba => ba.user_id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.members.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetUser(this._bot.users.get(re.user_id))
                return re
            })
            return result
        }else return this.members.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.members.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            return result
        }else return this.members.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.members.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetUser(this._bot.users.get(re.user_id))
                return re
            }).map(filter)
        }else return this.members.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.members[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            return result
        }else return this.members[position]
    }

    get length(){
        return this.members.length
    }
}

module.exports = Members