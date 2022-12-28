const Base = require("./base")
class Button extends Base{
    constructor(button, bot){
        super(button, bot)
        this.typee = "boutton"
    }

    get isButton(){
        return true
    }

    get isSlash(){
        return false
    }

    get isContextMenu(){
        return false
    }

    get isForm(){
        return false
    }
}
module.exports = Button