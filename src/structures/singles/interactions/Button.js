const Base = require("../../bases/interactions/basecomponent")

class Button extends Base{
    constructor(button, bot){
        super("button", button, bot)
    }
}

module.exports = Button