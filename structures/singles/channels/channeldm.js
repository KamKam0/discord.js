const TextBase = require("../../bases/channels/textbase")
class Channel extends TextBase{
    constructor(channel, bot){
        super(channel, bot)
        this.recipients = channel.recipients
    }
}
module.exports = Channel