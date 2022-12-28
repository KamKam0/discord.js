const Base = require("./base")
class Slash extends Base{
    constructor(slash, bot){
        super(slash, bot)
        this.data = slash.data
        this.typee = "slash"
    }

    get isslash(){
        return false
    }

    get isSlash(){
        return true
    }

    get isContextMenu(){
        return false
    }

    get isForm(){
        return false
    }
}
module.exports = Slash