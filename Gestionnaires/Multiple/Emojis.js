const Emoji = require("../Individual/Emoji")
class Emojis{
    constructor(_bot, guildid){
        this.guild_id = guildid
        this.emojis = []
        this._bot = _bot
    }

    AddEmoji(emoji){
        this.emojis.push(new Emoji({...emoji, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddEmojis(emojis){
        this.emojis.push(...emojis.map(emo => new Emoji({...emo, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot)))
        return this
    }

    DeleteEmoji(ID){
        this.emojis.splice(this.emojis.indexOf(this.emojis.find(emo => emo.id === ID)), 1)
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.emojis.find(ba => ba.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.emojis.find(ba => ba.id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.emojis.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                return re
            })
            return result
        }else return this.emojis.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.emojis.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.emojis.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.emojis.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                return re
            }).map(filter)
        }else return this.emojis.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.emojis[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.emojis[position]
    }

    get length(){
        return this.emojis.length
    }
}

module.exports = Emojis