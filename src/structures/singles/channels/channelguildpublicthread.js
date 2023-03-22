const GuildText = require("../../bases/channels/basethread")
class Channel extends GuildText{
    constructor(channel, bot){
        super(channel, bot)
    }
}
module.exports = Channel