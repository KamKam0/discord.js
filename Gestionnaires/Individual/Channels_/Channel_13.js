const GuildVoice = require("./Bases/guildVoice")
class Channel extends GuildVoice{
    constructor(channel, bot){
        super(channel, bot)
    }
}
module.exports = Channel