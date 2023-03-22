const Base = require("../../bases/interactions/base")

class Slash extends Base{
    constructor(slash, bot){
        super("slash", slash, bot)
        this.id = slash.data.id
        this.options = slash.data.options
    }

    getOption(name){
        if(!this.options) return null
        return this.options.find(compo => compo.name === name) || null
    }
}

module.exports = Slash