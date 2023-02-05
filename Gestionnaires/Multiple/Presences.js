const Base = require("./baseMultiple")
class Presences extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "presence")
    }

    __Treat(presence){
        if(this.get(presence.user_id)) this.get(presence.user_id).__Modify_Datas(presence)
        else this.__add(presence)
    }
}

module.exports = Presences