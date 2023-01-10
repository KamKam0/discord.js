const Event = require("../Individual/Event")
const Base = require("./baseMultiple")
class Events extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    __AddEvent(event){
        this.container.push(new Event({...event, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    __AddEvents(events){
        events.map(ev => this.__AddEvent(ev))
        return this
    }

    __DeleteEvent(ID){
        this.container.splice(this.container.indexOf(this.container.find(ev => ev.id === ID)), 1)
        return this
    }
}

module.exports = Events