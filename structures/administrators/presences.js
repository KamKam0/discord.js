const BasePresence = require("../managers/presences")
class Presences extends BasePresence{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }
}

module.exports = Presences