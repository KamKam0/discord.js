const Thread = require("../Individual/Thread")
class Threads{
    constructor(_bot, guildid){
        this.guild_id = guildid
        this.threads = []
        this._bot = _bot
    }

    AddThread(thread){
        if(this._bot) this.threads.push(new Thread({...thread, token: this._bot.discordjs.token, guild_id: this.guild_id}))
        else this.threads.push(new Thread({...thread, guild_id: this.guild_id}))
        return this
    }

    AddThreads(Threads){
        if(this._bot) this.threads.push(...Threads.map(th => new Thread({...th, token: this._bot.discordjs.token, guild_id: this.guild_id})))
        else this.threads.push(...Threads.map(th => new Thread({...th, guild_id: this.guild_id})))
        return this
    }

    DeleteThread(ID){
        this.threads.splice(this.threads.indexOf(this.threads.find(th => th.id === ID)), 1)
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.threads.find(ba => ba.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetOwner(this._bot.users.get(result.user_id))
            if(result) result.SetParent(this._bot.channels.get(result.channel_id))
            return result
        }else return this.threads.find(ba => ba.id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.threads.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetOwner(this._bot.users.get(re.user_id))
                re.SetParent(this._bot.channels.get(re.channel_id))
                return re
            })
            return result
        }else return this.threads.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.threads.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetOwner(this._bot.users.get(result.user_id))
            if(result) result.SetParent(this._bot.channels.get(result.channel_id))
            return result
        }else return this.threads.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.threads.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetOwner(this._bot.users.get(re.user_id))
                re.SetParent(this._bot.channels.get(re.channel_id))
                return re
            }).map(filter)
        }else return this.threads.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.threads[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetOwner(this._bot.users.get(result.user_id))
            if(result) result.SetParent(this._bot.channels.get(result.channel_id))
            return result
        }else return this.threads[position]
    }

    get length(){
        return this.threads.length
    }
}

module.exports = Threads