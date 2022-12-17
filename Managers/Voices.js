const BaseVoice = require("../Gestionnaires/Multiple/Voices")
class Voices extends BaseVoice{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }
}

module.exports = Voices