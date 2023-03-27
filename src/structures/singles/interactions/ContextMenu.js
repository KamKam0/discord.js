const Base = require("../../bases/interactions/basecomponent")

class Menu extends Base{
    constructor(contextMenu, bot){
        super("menu", contextMenu, bot)
        this.values = contextMenu.data.values
    }
}

module.exports = Menu