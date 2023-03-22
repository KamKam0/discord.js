const Base = require("../bases/basemultiple")
class Presences extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "presence")
    }

    _Treat(presence){
        if(this.get(presence.user_id)) this.get(presence.user_id)._Modify_Datas(presence)
        else this._add(presence)
    }
}

module.exports = Presences