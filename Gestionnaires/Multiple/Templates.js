const Template = require("../Individual/Template")
class Templates{
    constructor(_bot){
        this.templates = []
        this._bot = _bot
    }

    AddTemplate(template){
        this.templates.push(new Template({...template, token: this._bot.discordjs.token}, this._bot))
        return this
    }

    AddTemplates(templates){
        this.templates.push(...templates.map(te => new Template({...te, token: this._bot.discordjs.token}, this._bot)))
        return this
    }

    DeleteTemplate(ID){
        this.templates.splice(this.templates.indexOf(this.templates.find(te => te.code === ID)), 1)
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.templates.find(ba => ba.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.templates.find(ba => ba.id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.templates.filter(filter)
            result = result.map(re => re.SetGuild(this._bot.guilds.get(re.guild_id)))
            return result
        }else return this.templates.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.templates.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.templates.find(filter)
    }

    map(filter){
        if(this._bot) return this.templates.map(re => re.SetGuild(this._bot.guilds.get(re.guild_id))).map(filter)
        else return this.webhooks.map(filter)
        
    }

    select(position){
        if(this._bot){
            let result = this.templates[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            return result
        }else return this.templates[position]
    }

    get length(){
        return this.templates.length
    }
}

module.exports = Templates