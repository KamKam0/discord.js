const TextBase = require("./Bases/textBase")
class Channel extends TextBase{
    constructor(channel, bot){
        super(channel, bot)
        this.recipients = channel.recipients
    }
}
module.exports = Channel