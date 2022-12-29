const GuildText = require("./Bases/guildText")
class Channel extends GuildText{
    constructor(channel, bot){
        super(channel, bot)
        this.topic = channel.topic || null
    }
}
module.exports = Channel