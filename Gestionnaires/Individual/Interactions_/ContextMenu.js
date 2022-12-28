const Base = require("./base")
class Menu extends Base{
    constructor(menu, bot){
        super(menu, bot)
        this.values = menu.data.values
        this.typee = "menu"
    }

    get iscontextmenu(){
        return false
    }

    get isSlash(){
        return false
    }

    get isContextMenu(){
        return true
    }

    get isForm(){
        return false
    }
}
module.exports = Menu