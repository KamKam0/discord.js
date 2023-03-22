const Base = require("../bases/basemultiple")
class StageInstances extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "stage")
    }
}

module.exports = StageInstances