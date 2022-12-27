const Slash = require("../Individual/SlashCommand")
class Commands{
    constructor(_bot){
        this.commands = []
        this._bot = _bot
    }

    get(ID){
        return this.commands.find(cmd => cmd.id === ID)
    }

    AddCommand(int){
        this.commands.push(new Slash(int, this._bot))
        return this
    }

    AddCommands(commands){
        this.commands.push(...commands.map(int => new Slash(int, this._bot)))
        return this
    }

    DeleteCommand(name){
        this.commands.splice(this.commands.indexOf(this.commands.find(cmd => cmd.name === name)), 1)
        return this
    }

    filter(filter){
        return this.commands.filter(filter)
    }

    find(filter){
        return this.commands.find(filter)
    }

    map(filter){
        return this.commands.map(filter)
    }

    select(position){
        return this.commands[position]
    }

    get length(){
        return this.commands.length
    }
}

module.exports = Commands