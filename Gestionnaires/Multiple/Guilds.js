const Guild = require("../Individual/Guild")
class Guilds{
    constructor(_bot){
        this.guilds = []
        this._bot = _bot
    }

    get(ID){
        return this.guilds.find(gu => gu.id === ID)
    }

    AddGuild(guild){
        this.guilds.push(new Guild(this._bot, guild))
        return this
    }

    DeleteGuild(ID){
        this.guilds.splice(this.guilds.indexOf(this.guilds.find(gu => gu.id === ID)), 1)
        return this
    }

    DeleteGuilds(IDS){
        IDS.forEach(ID => {
            this.guilds.splice(this.guilds.indexOf(this.guilds.find(gu => gu.id === ID)), 1)
        })
        return this
    }

    ReplaceGuild(guild){
        this.guilds.splice(this.guilds.indexOf(this.guilds.find(gu => gu.id === guild.id)), 1)
        this.guilds.push(new Guild(this._bot, guild))
        return this
    }

    filter(filter){
        return this.guilds.filter(filter)
    }

    find(filter){
        return this.guilds.find(filter)
    }

    map(filter){
        return this.guilds.map(filter)
    }

    select(position){
        return this.guilds[position]
    }

    get length(){
        return this.guilds.length
    }
}

module.exports = Guilds