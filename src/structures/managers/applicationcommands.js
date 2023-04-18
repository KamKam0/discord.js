const Base = require("../bases/basemultiple")
class Commands extends Base{
    constructor(bot){
        super(bot, null, "command")
    }

    _modify(data){
        let instance = this.get(data.name)
        if(!instance) return
        let modifications = instance._modifyDatas(data)
        if(modifications.length) return modifications
        this._delete(data.name)
        this._add(data)
    }

    _delete(name){
        this.container.splice(this.container.indexOf(this.container.find(cmd => cmd.name === name)), 1)
        return this
    }
}

module.exports = Commands