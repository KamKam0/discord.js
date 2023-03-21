const Base = require("../bases/commands/base")
class Choice extends Base{
    constructor(choice){
        super()
        this.value = null

        if(choice) this._handleInitiationData(choice)
    }

    setValue(value){
        return this._setString("value", value, 100)
    }
}

module.exports = Choice