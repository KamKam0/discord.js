const Base = require("../../bases/interactions/base")

class Button extends Base{
    constructor(button, bot){
        super("button", button, bot)
    }
}

module.exports = Button