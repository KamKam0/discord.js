const BaseMessage = require("../managers/messages")
const methodMessage = require("../../methods/message")

class Messages extends BaseMessage{
    constructor(bot, guild_id){
        super(bot, guild_id)
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