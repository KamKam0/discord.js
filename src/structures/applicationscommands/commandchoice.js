const Base = require("../bases/commands/base")
class Choice extends Base{
    constructor(choice){
        super(choice)
        this.value = choice.value || null
    }

    setValue(value){
        return this._setString("value", value, 100)
    }
}

module.exports = Choice