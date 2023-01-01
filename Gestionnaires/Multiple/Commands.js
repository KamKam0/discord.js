const Slash = require("../Individual/SlashCommand")
const Base = require("./baseMultiple")
class Commands extends Base{
    constructor(_bot){
        super(_bot)
    }

    AddCommand(int){
        this.container.push(new Slash(int, this._bot))
        return this
    }

    AddCommands(commands){
        commands.map(int => this.AddCommand(int))
        return this
    }

    DeleteCommand(name){
        this.container.splice(this.container.indexOf(this.container.find(cmd => cmd.name === name)), 1)
        return this
    }
}

module.exports = Commands