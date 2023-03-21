const GuildVoice = require("../../bases/channels/guildvoice")
class Channel extends GuildVoice{
    constructor(channel, bot){
        super(channel, bot)
    }
}
module.exports = Channel