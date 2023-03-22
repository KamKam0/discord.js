const Base = require("../bases/basemultiple")
class Members extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "member")
    }

    get(ID){
        return this.container.find(ba => ba.user_id === ID)
    }

    _delete(ID){
        this.container.splice(this.container.indexOf(this.container.find(me => me.user_id === ID)), 1)
        return this
    }
}

module.exports = Members