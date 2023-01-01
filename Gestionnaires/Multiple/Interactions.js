const Interaction = require("../Individual/SlashCommand")
const Base = require("./baseMultiple")
class Interactions extends Base{
    constructor(_bot){
        super(_bot)
    }

    AddInteraction(int){
        this.container.push(new Interaction({...int, token: this._bot.discordjs.token}))
        return this
    }

    AddInteractions(interactions){
        interactions.map(int => this.AddInteraction(int))
        return this
    }
}

module.exports = Interactions