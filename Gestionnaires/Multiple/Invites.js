const Invite = require("../Individual/Invite")
class Invites{
    constructor(_bot, guildid){
        this.guild_id = guildid
        this.invites = []
        this._bot = _bot
    }

    AddInvite(invite){
        this.invites.push(new Invite({...invite, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddInvites(invites){
        this.invites.push(...invites.map(inv => new Invite({...inv, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot)))
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.invites.find(ba => ba.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            if(result) result.SetInviter(this._bot.users.get(result.inviter_id))
            return result
        }else return this.invites.find(ba => ba.id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.invites.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetChannel(this._bot.channels.get(re.channel_id))
                re.SetInviter(this._bot.users.get(re.inviter_id))
                return re
            })
            return result
        }else return this.interactions.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.invites.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            if(result) result.SetInviter(this._bot.users.get(result.inviter_id))
            return result
        }else return this.invites.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.invites.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetChannel(this._bot.channels.get(re.channel_id))
                re.SetInviter(this._bot.users.get(re.inviter_id))
                return re
            }).map(filter)
        }else return this.invites.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.invites[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            if(result) result.SetInviter(this._bot.users.get(result.inviter_id))
            return result
        }else return this.invites[position]
    }

    get length(){
        return this.invites.length
    }
}

module.exports = Invites