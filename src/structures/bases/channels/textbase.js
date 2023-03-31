const Base = require("./base")
const messageMethod = require("../../../methods/message")
const channelMethod = require("../../../methods/channel")
const pinsAdministrator = require("../../administrators/pins")
const channelMessageAdministrator = require("../../administrators/channels/channelmessages")

class TextBase extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.pins = new pinsAdministrator(bot, this.id)
        this.messages = new channelMessageAdministrator(bot, null, this.id)
    }

    /**
     * 
     * @returns 
     */
    async triggerTyping(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return channelMethod.triggertyping(informations)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async send(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            channel_id: this.id
        }
        return messageMethod.send(informations, options)
    }
}

module.exports = TextBase