const BaseVoice = require("../managers/voices")
class Voices extends BaseVoice{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }
}

module.exports = Voices