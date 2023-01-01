class baseMutliple{
    constructor(_bot, guild_id){
        this.container = []
        this._bot = _bot
        this.guild_id = guild_id || null
    }

    get(ID){
        return this.container.find(el => el.id === ID)
    }

    filter(filter){
        return this.container.filter(filter)
    }

    find(filter){
        return this.container.find(filter)
    }

    map(filter){
        return this.container.map(filter)
    }

    select(position){
        return this.container[position]
    }

    get length(){
        return this.container.length
    }
}

module.exports = baseMutliple