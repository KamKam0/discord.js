const BaseGuild = require("../Gestionnaires/Multiple/Guilds")
class Guilds extends BaseGuild{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }
}

module.exports = Guilds