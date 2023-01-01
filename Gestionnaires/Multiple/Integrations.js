const Integration = require("../Individual/Integration")
const Base = require("./baseMultiple")
class Integrations extends Base{
    constructor(_bot){
        super(_bot)
    }

    AddIntegration(integration){
        this.container.push(new Integration({...integration, token: this._bot.discordjs.token}, this._bot))
        return this
    }

    AddIntegrations(integrations){
        integrations.map(int => this.AddIntegration(int))
        return this
    }

    DeleteIntegration(ID){
        this.container.splice(this.container.indexOf(this.container.find(int => int.id === ID)), 1)
        return this
    }
}

module.exports = Integrations