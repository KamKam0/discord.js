const Interaction = require("../Individual/SlashCommand")
const Base = require("./baseMultiple")
class Interactions extends Base{
    constructor(_bot){
        super(_bot)
    }

    __AddInteraction(int){
        this.container.push(new Interaction({...int, token: this._bot.discordjs.token}, this._bot))
        return this
    }

    __AddInteractions(interactions){
        interactions.map(int => this.__AddInteraction(int))
        return this
    }
}

module.exports = Interactions