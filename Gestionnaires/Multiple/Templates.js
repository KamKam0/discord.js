const Template = require("../Individual/Template")
const Base = require("./baseMultiple")
class Templates extends Base{
    constructor(_bot){
        super(_bot)
    }

    AddTemplate(template){
        this.container.push(new Template({...template, token: this._bot.discordjs.token}, this._bot))
        return this
    }

    AddTemplates(templates){
        templates.map(te => this.AddTemplate(te))
        return this
    }

    DeleteTemplate(ID){
        this.container.splice(this.container.indexOf(this.container.find(te => te.code === ID)), 1)
        return this
    }
}

module.exports = Templates