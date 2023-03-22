const Base = require("../bases/basemultiple")
class Voices extends Base{
    constructor(bot, guildid){
        super(bot, guildid, "voice")
    }

    _delete(ID){
        this.container.splice(this.container.indexOf(this.container.find(vo => vo.user_id === ID)), 1)
        return this
    }

    get(ID){
        return this.container.find(ba => ba.user_id === ID)
    }
}

module.exports = Voices