const Sticker = require("../Individual/Sticker")
class Stickers{
    constructor(_bot, guildid){
        this.guild_id = guildid
        this.stickers = []
        this._bot = _bot
    }

    AddSticker(sticker){
        if(this._bot) this.stickers.push(new Sticker({...sticker, token: this._bot.discordjs.token, guild_id: this.guild_id}))
        else this.stickers.push(new Sticker({...sticker, guild_id: this.guild_id}))
        return this
    }

    AddStickers(stickers){
        if(this._bot) this.stickers.push(...stickers.map(sti => new Sticker({...sti, token: this._bot.discordjs.token, guild_id: this.guild_id})))
        else this.stickers.push(...stickers.map(sti => new Sticker({...sti, guild_id: this.guild_id})))
        return this
    }

    DeleteSticker(ID){
        this.stickers.splice(this.stickers.indexOf(this.stickers.find(sti => sti.id === ID)), 1)
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.stickers.find(ba => ba.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.stickers.find(ba => ba.id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.stickers.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                return re
            })
            return result
        }else return this.stickers.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.stickers.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.stickers.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.stickers.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                return re
            }).map(filter)
        }else return this.stickers.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.stickers[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.stickers[position]
    }

    get length(){
        return this.stickers.length
    }
}

module.exports = Stickers