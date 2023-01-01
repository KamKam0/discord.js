const Message = require("../Individual/Message")
const Base = require("./baseMultiple")
class Messages extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    AddMessage(message){
        this.container.push(new Message({...message, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddMessages(messages){
        messages.map(me => this.AddMessage(me))
        return this
    }

    DeleteMessage(ID){
        if(this.container.find(me => me.id === ID)) this.container.splice(this.container.indexOf(this.container.find(me => me.id === ID)), 1)
        return this
    }

    DeleteMessages(IDS){
        IDS.forEach(ID => {
            if(this.container.find(msg => msg.id === ID)) this.container.splice(this.container.indexOf(this.container.find(msg => msg.id === ID)), 1)
        })
        return this
    }
}

module.exports = Messages