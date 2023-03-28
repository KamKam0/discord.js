const Base = require("../bases/basemultiple")
class Templates extends Base{
    constructor(_bot, guild_id){
        super(_bot, guild_id, "template")
    }

    get(ID){
        return this.container.find(el => el.code === ID)
    }

    _delete(data){
        if(this.container.find(me => me.code === data)) this.container.splice(this.container.indexOf(this.container.find(me => me.code === data)), 1)
        return this
    }
}

module.exports = Templates