const Voice = require("../Individual/Voice")
class Voices{
    constructor(bot, guildid){
        this.guild_id = guildid
        this.voices = []
        this._bot = bot
    }

    AddVoice(voice){
        this.voices.push(new Voice({...voice, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddVoices(voices){
        this.voices.push(...voices.map(vo => new Voice({...vo, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot)))
        return this
    }

    DeleteVoice(ID){
        this.voices.splice(this.voices.indexOf(this.voices.find(vo => vo.user_id === ID)), 1)
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.voices.find(ba => ba.user_id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            if(result) result.SetMember(result.guild.members.get(result.user_id))
            return result
        }else return this.users.find(ba => ba.user_id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.voices.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetUser(this._bot.users.get(re.user_id))
                re.SetChannel(this._bot.channels.get(re.channel_id))
                re.SetMember(re.guild.members.get(re.user_id))
                return re
            })
            return result
        }else return this.voices.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.voices.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            if(result) result.SetMember(result.guild.members.get(result.user_id))
            return result
        }else return this.voices.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.voices.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetUser(this._bot.users.get(re.user_id))
                re.SetChannel(this._bot.channels.get(re.channel_id))
                re.SetMember(re.guild.members.get(re.user_id))
                return re
            }).map(filter)
        }else return this.voices.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.voices[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetUser(this._bot.users.get(result.user_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            if(result) result.SetMember(result.guild.members.get(result.user_id))
            return result
        }else return this.voices[position]
    }

    get length(){
        return this.voices.length
    }
}

module.exports = Voices