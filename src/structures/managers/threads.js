const Base = require("../bases/basemultiple")
class Threads extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "thread")
    }
}

module.exports = Threads