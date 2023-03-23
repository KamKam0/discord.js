const Base = require("../bases/basemultiple")
class Commands extends Base{
    constructor(bot){
        super(bot, null, "command")
    }

    _delete(name){
        this.container.splice(this.container.indexOf(this.container.find(cmd => cmd.name === name)), 1)
        return this
    }
}

module.exports = Commands