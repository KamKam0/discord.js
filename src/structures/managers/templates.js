const Base = require("../bases/basemultiple")
class Templates extends Base{
    constructor(_bot, guild_id){
        super(_bot, guild_id, "template", 'code')
    }
}

module.exports = Templates