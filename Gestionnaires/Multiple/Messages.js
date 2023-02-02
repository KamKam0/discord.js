const Message = require("../Individual/Message")
const Base = require("./baseMultiple")
class Messages extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    __AddMessage(message){
        this.container.push(new Message({...message, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    __AddMessages(messages){
        messages.map(me => this.__AddMessage(me))
        return this
    }

    __DeleteMessage(ID){
        if(this.container.find(me => me.id === ID)) this.container.splice(this.container.indexOf(this.container.find(me => me.id === ID)), 1)
        return this
    }

    __DeleteMessages(IDS){
        IDS.map(msg => this.__DeleteMessage(msg))
        return this
    }
}

module.exports = Messages