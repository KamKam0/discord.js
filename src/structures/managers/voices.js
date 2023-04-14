const Base = require("../bases/basemultiple")
class Voices extends Base{
    constructor(bot, guildid){
        super(bot, guildid, "voice")
    }

    _modify(data){
        let modifications = this.get(data.user_id)._modifyDatas(data)
        if(modifications.length) return modifications
        this._delete(data.user_id)
        this._add(data)
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