const Base = require("./base")
class Modal extends Base{
    constructor(modal, bot){
        super(modal, bot)
        this.components = modal.data.components.filter(e => e.components[0].value !== "")
        this.typee = "modal"
    }

    get ismodal(){
        return false
    }

    get isSlash(){
        return false
    }

    get isContextMenu(){
        return false
    }

    get isForm(){
        return true
    }
}
module.exports = Modal