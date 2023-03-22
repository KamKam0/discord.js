const Base = require("../bases/basemultiple")
class Integrations extends Base{
    constructor(_bot){
        super(_bot, null, "integration")
    }
}

module.exports = Integrations