const Message = require("../Individual/Message")
class Messages{
    constructor(_bot, guildid){
        this.guild_id = guildid
        this.messages = []
        this._bot = _bot
    }

    AddMessage(message){
        this.messages.push(new Message({...message, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddMessages(messages){
        this.messages.push(...messages.map(me => new Message({...me, token: this._bot.discordjs.token, guild_id: this.guild_id}), this._bot))
        return this
    }

    DeleteMessage(ID){
        if(this.messages.find(me => me.id === ID)) this.messages.splice(this.messages.indexOf(this.messages.find(me => me.id === ID)), 1)
        return this
    }

    DeleteMessages(IDS){
        IDS.forEach(ID => {
            if(this.messages.find(msg => msg.id === ID)) this.messages.splice(this.messages.indexOf(this.messages.find(msg => msg.id === ID)), 1)
        })
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.messages.find(ba => ba.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            if(result) result.SetMember(result.guild.members.get(result.user_id))
            return result
        }else return this.messages.find(ba => ba.id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.messages.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetUser(this._bot.users.get(re.user_id))
                re.SetChannel(this._bot.channels.get(re.channel_id))
                re.SetMember(re.guild.members.get(re.user_id))
                return re
            })
            return result
        }else return this.messages.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.messages.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            if(result) result.SetMember(result.guild.members.get(result.user_id))
            return result
        }else return this.messages.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.messages.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetUser(this._bot.users.get(re.user_id))
                re.SetChannel(this._bot.channels.get(re.channel_id))
                re.SetMember(re.guild.members.get(re.user_id))
                return re
            }).map(filter)
        }else return this.messages.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.messages[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            if(result) result.SetMember(result.guild.members.get(result.user_id))
            return result
        }else return this.messages[position]
    }

    get length(){
        return this.messages.length
    }
}

module.exports = Messages