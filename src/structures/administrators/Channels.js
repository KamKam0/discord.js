const BaseChannel = require("../managers/channels")

class Channels extends BaseChannel{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }
}

module.exports = Channels