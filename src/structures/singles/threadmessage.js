const Message = require("./message")
const threadMethod = require("../../methods/threads")
class threadMessage extends Message{
    constructor(data, bot){
        super(data, bot)
    }

    createThread(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            message_id: this.id,
            channel_id: this.channel_id
        }
        return threadMethod.create_withm(informations)
    }
}

module.exports = threadMessage