const Thread = require("../Individual/Thread")
const Base = require("./baseMultiple")
class Threads extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    AddThread(thread){
        this.container.push(new Thread({...thread, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddThreads(Threads){
        Threads.map(th => this.AddThread(th))
        return this
    }

    DeleteThread(ID){
        this.container.splice(this.container.indexOf(this.container.find(th => th.id === ID)), 1)
        return this
    }
}

module.exports = Threads