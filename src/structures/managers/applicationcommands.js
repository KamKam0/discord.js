const Base = require("../bases/basemultiple")
class Commands extends Base{
    constructor(bot){
        super(bot, null, "command", 'name')
    }
}

module.exports = Commands