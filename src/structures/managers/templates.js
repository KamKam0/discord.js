const Base = require("../bases/basemultiple")
class Templates extends Base{
    constructor(_bot, guild_id){
        super(_bot, guild_id, "template")
    }

    _modify(data){
        let modifications = this.get(data.code)._modifyDatas(data)
        if(modifications.length) return modifications
        this._delete(data.code)
        this._add(data)
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