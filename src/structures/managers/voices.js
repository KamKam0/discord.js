const Base = require("../bases/basemultiple")
class Voices extends Base{
    constructor(bot, guildid){
        super(bot, guildid, "voice", 'user_id')
        this._ignoreParameters = [
            'member'
        ]
    }
}

module.exports = Voices