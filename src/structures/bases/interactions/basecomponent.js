const Base = require("./base")

class Component extends Base{
    constructor(type, component, bot){
        super(type, component, bot)
        this.custom_id = component.data.custom_id
    }

    async deferredResponse(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            interaction_id: this.id,
            interaction_token: this.token
        }
        return interactionMethod.reply(informations, options, true)
    }
}

module.exports = Component