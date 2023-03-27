const Base = require("./base")

class Component extends Base{
    constructor(type, component, bot){
        super(type, component, bot)
        this.custom_id = component.custom_id
    }
}

module.exports = Component