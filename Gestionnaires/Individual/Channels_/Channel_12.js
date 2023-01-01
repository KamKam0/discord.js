const GuildText = require("./Bases/baseThread")
class Channel extends GuildText{
    constructor(channel, bot){
        super(channel, bot)
    }
}
module.exports = Channel