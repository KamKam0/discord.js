const Utils = require("../utils/functions")
const Embed = require("../structures/components/embed")
const ApplicationCommand = require("../structures/applicationscommands/command")

class Initiate{
    constructor(bot){
        this._bot = bot
    }

    async init(){
        this.#checkCommandsErrors()
        if(!this._bot.ws.discordSide.commandsChecked) return reject(null)
        return this.#manageCommands()
    }

    async #manageCommands(){
        return new Promise(async (resolve, reject) => {
            let commands = await this._bot.commands.fetchAll().catch(err => console.log(err))
    
            this._bot.handler.GetAllCommandsfi().filter(cmd => !cmd.help.unclass).forEach(commande => {
                let descriptions_cmd, names_cmd, descriptions_opt, names_opt, names_cho;
    
                let las = (commande.help.langues && commande.help.langues[0]) ? commande.help.langues : this._bot.langues
    
                descriptions_cmd = {}
                names_cmd = {}
                las.forEach(la => {
                    if(la.Langue_Code === this._bot.default_language) commande.description = la.Help[`${commande.name}_description`]
                    descriptions_cmd[la.Langue_Code] = la.Help[`${commande.name}_description`]
                    names_cmd[la.Langue_Code] = la.Help[`${commande.name}_name`]
                })
                if(commande.help.options && commande.help.options[0]) commande.help.options.forEach(option => {
                    descriptions_opt = {}
                    names_opt = {}
                    las.forEach(la => {
                        if(la.Langue_Code === this._bot.default_language) option.description = la.Options[`${commande.name}_${option.name}_description`]
                        descriptions_opt[la.Langue_Code] = la.Options[`${commande.name}_${option.name}_description`]
                        names_opt[la.Langue_Code] = la.Options[`${commande.name}_${option.name}_name`]
                    })
                    option.name_localizations = names_opt
                    option.description_localizations = descriptions_opt
                    if(option.choices) option.choices.forEach(choice => {
                        names_cho = {}
                        las.forEach(la => {
                            names_cho[la.Langue_Code] = la.Choices[`${commande.name}_${option.name}_${choice.name}_name`]
                        })
                        choice.name_localizations = names_cho
                    })
                })
                
                let cmd = commands.find(cmd => cmd.name === commande.name)
                let data  = new ApplicationCommand({name: commande.name, description: commande.description, options: commande.help.options || [], nsfw: commande.help.nsfw || undefined, description_localizations: descriptions_cmd, name_localizations: names_cmd, dm_permission: commande.help.dm, default_member_permissions: commande.help.autorisation, id: cmd?.id, application_id: cmd?.application_id, version: cmd?.version})
                
                if(!cmd) this._bot.commands.create(data.toJSON())
                else{
                    if(!data.compare(cmd)) ""// this._bot.commands.modify(data)
                    else if(!this._bot.commands.get(data.id)) this._bot.commands._add(data)
                    else{
                        this._bot.commands._delete(cmd.id)
                        this._bot.commands._add(data)
                    }
                    commands = commands._delete(cmd.name)
                }
            })
            if(commands.length > 0) commands.container.forEach(cmd => this._bot.commands.delete(cmd.id))

            return resolve(null)
        })
    }

    async #checkCommandsErrors(){
        let checked = this.#checkCommands()
        if(!checked.status){
            let erembed = new Embed()
            .setTitle("Command error")

            if(checked.errors.length > 10) checked.errors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(nu => checked.errors[nu])

            checked.errors.forEach(che => {
                let errtexte = ""
                if(che.errors.length > 5) che.errors = [0, 1, 2, 3, 4].map(nu => che.errors[nu])
                che.errors.forEach(err => {
                    if(errtexte.length === 0) errtexte += `\`\`\``
                    else errtexte += `\`\`\`\n\n\`\`\``
                    err = Object.entries(err)
                    err.forEach(err => errtexte += `\n\n${err[0]}: ${err[1]}`)
                })
                erembed.addField(che.errors[0].cmd, errtexte + "```", true)
            })
                
            return this._bot.sendMessage(this._bot.creator.channel_id, {embeds: [erembed]}) .catch(err => {})
        }
    }

    #checkCommands(){
        let commands = this._bot.handler.GetAllCommands()
        let error = []
        let slashChecker = Utils.checks.checkApplicationCommand
        commands.forEach(cmd => {
            if(!cmd.help) error.push({cmd: cmd.name, err: "no help"})
            else{
                let verif = slashChecker({...cmd.help, name: cmd.name}, true, ((cmd.help.langues && cmd.help.langues[0]) ? cmd.help.langues : this._bot.langues))
                if(!verif.status) error.push({...verif, cmd: cmd.name})
            }
        })
        if(error.length !== 0){
            this._bot.ws.discordSide.commandsChecked = false
            return {status: false, errors: error}
        } 
        else {
            this._bot.ws.discordSide.commandsChecked = true
            return {status: true}
        }
    }
}

module.exports = Initiate