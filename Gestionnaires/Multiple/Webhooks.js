const Webhook = require("../Individual/Webhook")
class Webhooks{
    constructor(bot, guildid){
        this.guild_id = guildid
        this.webhooks = []
        this._bot = bot
    }

    AddWebhook(webhook){
        this.webhooks.push(new Webhook({...webhook, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddWebhooks(webhooks){
        this.webhooks.push(...webhooks.map(we => new Webhook({...we, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot)))
        return this
    }

    DeleteWebhook(ID){
        this.webhooks.splice(this.webhooks.indexOf(this.webhooks.find(we => we.id === ID)), 1)
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.webhooks.find(ba => ba.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            return result
        }else return this.webhooks.find(ba => ba.id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.webhooks.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetUser(this._bot.users.get(re.user_id))
                re.SetChannel(this._bot.channels.get(re.channel_id))
                return re
            })
            return result
        }else return this.webhooks.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.webhooks.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            return result
        }else return this.webhooks.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.webhooks.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetUser(this._bot.users.get(re.user_id))
                re.SetChannel(this._bot.channels.get(re.channel_id))
                return re
            }).map(filter)
        }else return this.webhooks.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.webhooks[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            return result
        }else return this.webhooks[position]
    }

    get length(){
        return this.webhooks.length
    }
}

module.exports = Webhooks