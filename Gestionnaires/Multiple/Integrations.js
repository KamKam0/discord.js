const Integration = require("../Individual/Integration")
const Base = require("./baseMultiple")
class Integrations extends Base{
    constructor(_bot){
        super(_bot)
    }

    __AddIntegration(integration){
        this.container.push(new Integration({...integration, token: this._bot.discordjs.token}, this._bot))
        return this
    }

    __AddIntegrations(integrations){
        integrations.map(int => this.__AddIntegration(int))
        return this
    }

    __DeleteIntegration(ID){
        this.container.splice(this.container.indexOf(this.container.find(int => int.id === ID)), 1)
        return this
    }
}

module.exports = Integrations