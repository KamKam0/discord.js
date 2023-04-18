const Base = require("../bases/basemultiple")
class Members extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "member")
    }

    _modify(data){
        let instance = this.get(data.user_id)
        if(!instance) return
        let modifications = instance._modifyDatas(data)
        if(modifications.length) return modifications
        this._delete(data.user_id)
        this._add(data)
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