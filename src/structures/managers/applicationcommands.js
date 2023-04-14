const Base = require("../bases/basemultiple")
class Commands extends Base{
    constructor(bot){
        super(bot, null, "command")
    }

    _modify(data){
        let modifications = this.get(data.name)._modifyDatas(data)
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