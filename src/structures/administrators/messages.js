const BaseMessage = require("../managers/messages")
const Message = require('../singles/message')
const methodMessage = require("../../methods/message")

class Messages extends BaseMessage{
    constructor(bot, guild_id, limitMessages=false){
        super(bot, guild_id)

        this.limitMessages = limitMessages
    }

    _add(data){
        if (this.limitMessages && this.container.length === 200) {
            this.container.shift()
        }
        if (data instanceof Message) {
            this.container.push(data)
        } else {
            this.container.push(new Message({...data, guild_id: this.guild_id}, this._bot))
        }
        return this
    }

    async send(channelid, options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            channel_id: channelid
        }
        return methodMessage.send(informations, options)
    }
    
    async modify(channelid, messageid, options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            channel_id: channelid,
            message_id: messageid
        }
        return methodMessage.modify(informations, options)
    }
    
    async delete(channelid, messageid, options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            channel_id: channelid,
            message_id: messageid
        }
        return methodMessage.delete(informations, options)
    }
}

module.exports = Messages