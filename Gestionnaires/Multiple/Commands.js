const Slash = require("../../Classes/ApplicationCommand")
const Base = require("./baseMultiple")
class Commands extends Base{
    constructor(_bot){
        super(_bot)
    }

    __delete(name){
        this.container.splice(this.container.indexOf(this.container.find(cmd => cmd.name === name)), 1)
        return this
    }
}

module.exports = Commands