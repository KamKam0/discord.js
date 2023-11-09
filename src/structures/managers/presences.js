const Base = require("../bases/basemultiple")
class Presences extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "presence")
    }

    _Treat(presence){
        if(this.get(presence.user_id)) {
            let modifications = this._modify(presence)
            return modifications
        }
        
        this._add(presence)
        return null
    }
}

module.exports = Presences