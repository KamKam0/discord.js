const StageInstance = require("../Individual/StageInstance")
class StageInstances{
    constructor(_bot, guildid){
        this.guild_id = guildid
        this.stages = []
        this._bot = _bot
    }

    AddStage(stage){
        if(this._bot) this.stages.push(new StageInstance({...stage, token: this._bot.discordjs.token, guild_id: this.guild_id}))
        else this.stages.push(new StageInstance({...stage, guild_id: this.guild_id}))
        return this
    }

    AddStages(stages){
        if(this._bot) this.stages.push(...stages.map(sta => new StageInstance({...sta, token: this._bot.discordjs.token, guild_id: this.guild_id})))
        else this.stages.push(...stages.map(sta => new StageInstance({...sta, guild_id: this.guild_id})))
        return this
    }

    DeleteStage(ID){
        this.stages.splice(this.stages.indexOf(this.stages.find(sta => sta.id === ID)), 1)
        return this
    }

    get(ID){
        if(this._bot){
            let result = this.stages.find(ba => ba.id === ID)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            return result
        }else return this.stages.find(ba => ba.id === ID)
    }

    filter(filter){
        if(this._bot){
            let result = this.stages.filter(filter)
            result = result.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetChannel(this._bot.channels.get(re.channel_id))
                return re
            })
            return result
        }else return this.stages.filter(filter)
    }

    find(filter){
        if(this._bot){
            let result = this.stages.find(filter)
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            return result
        }else return this.stages.find(filter)
    }

    map(filter){
        if(this._bot){
            return this.stages.map(re => {
                re.SetGuild(this._bot.guilds.get(re.guild_id))
                re.SetChannel(this._bot.channels.get(re.channel_id))
                return re
            }).map(filter)
        }else return this.stages.map(filter)
    }

    select(position){
        if(this._bot){
            let result = this.stages[position]
            if(result) result.SetGuild(this._bot.guilds.get(result.guild_id))
            if(result) result.SetChannel(this._bot.channels.get(result.channel_id))
            return result
        }else return this.stages[position]
    }

    get length(){
        return this.stages.length
    }
}

module.exports = StageInstances