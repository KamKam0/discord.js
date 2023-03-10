const Guilds = require("../Managers/Guilds")
const Users = require("../Managers/Users")
const Channels = require("../Managers/Channels")
const EventEmitter = require("node:events")
const Cooldown = require("@kamkam1_0/cooldown")
const CommandHandler = require("@kamkam1_0/discord-commandhandler")
const EventHandler = require("@kamkam1_0/discord-eventhandler")
const VoiceManager = require("./VoiceManager")
const ApplicationCommands = require("../Managers/Commands")
const ORM = require("@kamkam1_0/sql-orm")
class Bot extends EventEmitter{
    constructor(intents, elements){
        super()
        this.langues = []
        this.intents = this.#attributeintents(intents)
        this.default_language = null
        this.discordjs = {}
        this.config = this.#getInfos()
        this.name = this.#checkName()
        this.sql = this.#attributeSQL(intents, elements)
        this.guilds = new Guilds(this)
        this.users = new Users(this)
        this.channels = new Channels(this)
        this.commands = new ApplicationCommands(this)
        this.state = "processing"
        this.cooldown = new Cooldown()
        this.handler = new CommandHandler.Handlers(this.name, this.langues)
        this.events = new EventHandler.Events(this, this.discordjs.availableEvents)
        this.presence = null
        this.user = null
        this.creator = null
        this.voice = new VoiceManager(this)
        this.utils = require("../Utils/functions")
    }

    __resetDjs(init){
        this.discordjs.ws = null
        this.discordjs.commandsChecked = null
        this.discordjs.lastEvent = null
        this.discordjs.interval = null
        this.discordjs.lastACK = null
        this.discordjs.session_id = null
        this.discordjs.HBinterval = null
        this.discordjs.dvdatas = null
        this.discordjs.lancement = null
        this.discordjs.guild_ids = []
        this.discordjs.available_ids = []
        this.discordjs.interval_state = null
        this.discordjs.lastPing = -1
        this.discordjs.reconnection_url = null
        if(init){
            this.discordjs.availableEvents = get_events()
            this.discordjs.token = null
            this.discordjs.lancementError = null
            this.discordjs.connectionInfos = {
                connection_url: null,
                connection_number: null,
                shard_advised: null
            }
        }
    }

    #attributeintents(intents){
        if(!intents || !Array.isArray(intents) || intents.filter(e => typeof e === "string").length !== intents.length) return require("../Utils/functions").get_intents_n("ALL")
        return require("../Utils/functions").get_intents_n(intents)
    }

    #attributeSQL(intents, elements){
        let toTreat = null
        if(!elements && intents) toTreat = intents
        else if(elements) toTreat = elements
        if(!toTreat) return new ORM({host: "127.0.0.1", port: 3306, user: "root", database: this.name})
        if(Array.isArray(toTreat) || typeof toTreat === "boolean"){
            if(typeof toTreat === "boolean") return false
            return new ORM(toTreat)
        }
        return new ORM({host: "127.0.0.1", port: 3306, user: "root", database: this.name})
    }

    get database_state(){
        if(!this.sql) return false
        if(this.sql.connectionState) return "stable"
        return "unstable"
    }

    __userStatus(ID){
        return new Promise(async (resolve, reject) => {
            if(!this.database_state || this.database_state === "unstable") return reject(new Error("La connexion avec la BDD sql n'est pas initialis??e - bot"))
            if(!ID) return reject(new Error("Incorrect infos"))
            let returnInfos = {0: "User", 1: "VIP", 2: "Admin", 3: "Admin & VIP", 4: "Owner"}
            if(ID === this.config.general["ID createur"]) return resolve({...returnInfos, value: 4})
            else if(this.sql){
                let tables = await this.sql.show()
                tables = tables.map(e => Object.values(e)[0])
                let value = 0
                let admin;
                let vip;
                if(tables.includes("admin")) admin = await this.sql.select("admin")
                if(tables.includes("vip")) vip = await this.sql.select("vip")
                if(admin && admin[0] && admin.find(e => Object.entries(e).find(c => c[0].toLowerCase() === "id")[1] === ID)) value += 2
                if(vip && vip[0] && vip.find(e => Object.entries(e).find(c => c[0].toLowerCase() === "id")[1] === ID)) value += 1
                return resolve({...returnInfos, value})
            }
            return resolve({...returnInfos, value: 0})
        })
    }

    __setCreator(datas){
        if(!datas || typeof datas !== "object" || !datas.id || !datas.channel_id) return "invalid"
        this.creator = datas
        return this
    }

    async awaitInteractions(options){
        return new Promise((resolve, reject) => {
            require("./Collector")(this, "interaction", {channel_id: options.channel_id || null, guild_id: options.guild_id || null, message_id: options.message_id || null, interaction_id: options.id || null}, options)
            .then(datas => resolve(datas))
            .catch(datas => reject(datas))
        })
    }

    collectInteractions(options){
        return require("./Collector").collect(this, "interaction", {channel_id: options.channel_id || null, guild_id: options.guild_id || null, message_id: options.message_id || null, interaction_id: options.id || null}, options)
    }

    #checkName(){
        let link = process.cwd()
        let symbol;
        if(require("node:os").platform() === "darwin") symbol = "/"
        else if (require("node:os").platform() === 'win32') symbol = "\\"
        link = link.split(symbol).filter(e => e.length > 0)
        return link[link.length - 1]
    }

    Login(presence){
        this.handler.Deploy()
        this.events.Deploy(presence)
        this.cooldown.Deploy(["global", "commands", "verif", "mention"])
        return new Promise(async (resolve, reject) => {
            require("../bot_manage").login(this, presence)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    getMe(){
        return new Promise(async (resolve, reject) => {
            require("../Methods/me").getuser(this.discordjs.token, this)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    __get_connection(presence){
        return {
            op: 2,
            d: {
                token: this.discordjs.token,
                intents: this.intents,
                compress: false,
                properties: {
                    os: require("node:os").platform(),
                    browser: `@kamkam1_0/discord.js v${require("../index").version}`,
                    device: `@kamkam1_0/discord.js v${require("../index").version}`
                },
                shards: [ 0 ],
                presence: require("../Utils/functions").presence(presence)
            }
        }
    }

    setStatus(options){
        let presence = require("../Methods/me").setstatus(this, options)
        this.events.presence = presence
        return presence
    }

    setActivity(options){
        let presence = require("../Methods/me").setactivity(this, options)
        this.events.presence = presence
        return presence
    }

    setPresence(options){
        let presence =  require("../Methods/me").setpresence(this, options)
        this.events.presence = presence
        return presence
    }
    
    SendMessage(channelid, options){
        return new Promise(async (resolve, reject) => {
            require("../Methods/message").send(this.discordjs.token, channelid, options, undefined, undefined, this)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
    
    ModifyMessage(channelid, messageid, options){
        return new Promise(async (resolve, reject) => {
            require("../Methods/message").modify(this.discordjs.token, channelid, messageid, options, this)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
    
    DeleteMessage(channelid, options){
        return new Promise(async (resolve, reject) => {
            require("../Methods/message").delete(this.discordjs.token, channelid, options, this)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    __Initiate(){
        let commands = this.handler.GetAllCommands()
        let error = []
        let SlashChecker = require("../Methods/interaction").VerifyInteraction
        commands.forEach(cmd => {
            if(!cmd.help) error.push({cmd: cmd.name, err: "no help"})
            else{
                let verif = SlashChecker({...cmd.help, name: cmd.name}, true, ((cmd.help.langues && cmd.help.langues[0]) ? cmd.help.langues : this.langues))
                if(!verif.status) error.push({...verif, cmd: cmd.name})
            }
        })
        if(error.length !== 0){
            this.discordjs.commandsChecked = false
            return {status: false, errors: error}
        } 
        else {
            this.discordjs.commandsChecked = true
            return {status: true}
        }
    }

    
    async checkCommands(){
        let commands = await this.commands.fetchAll()
        const commandClass = require("../Classes/ApplicationCommand")

        this.handler.GetAllCommandsfi().filter(cmd => !cmd.help.unclass).forEach(commande => {
            let descriptions_cmd, names_cmd, descriptions_opt, names_opt, names_cho;

            let las = (commande.help.langues && commande.help.langues[0]) ? commande.help.langues : this.langues

            descriptions_cmd = {}
            names_cmd = {}
            las.forEach(la => {
                if(la.Langue_Code === this.default_language) commande.description = la.Help[`${commande.name}_description`]
                descriptions_cmd[la.Langue_Code] = la.Help[`${commande.name}_description`]
                names_cmd[la.Langue_Code] = la.Help[`${commande.name}_name`]
            })
            if(commande.help.options && commande.help.options[0]) commande.help.options.forEach(option => {
                descriptions_opt = {}
                names_opt = {}
                las.forEach(la => {
                    if(la.Langue_Code === this.default_language) option.description = la.Options[`${commande.name}_${option.name}_description`]
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
            let datas  = new commandClass({name: commande.name, description: commande.description, options: commande.help.options || [], nsfw: commande.help.nsfw || undefined, description_localizations: descriptions_cmd, name_localizations: names_cmd, dm_permission: commande.help.dm, default_member_permissions: commande.help.autorisation, id: cmd?.id, application_id: cmd?.application_id, version: cmd?.version})
            
            if(!cmd) this.commands.create(datas.toJSON())
            else{
                if(!datas.compare(cmd)) this.commands.modify(datas)
                else if(!this.commands.get(datas.id)) this.commands.__add(datas)
                else{
                    this.commands.__delete(datas.id)
                    this.commands.__add(datas)
                }
                commands = commands.__delete(cmd.name)
            }
        })
        if(commands.length > 0) commands.container.forEach(cmd => this.commands.delete(cmd.id))

    }

    #TreatToken(env){
        if(env.token && env.token_beta && typeof env.token_beta === "string" && process.argv.includes("-t")) this.discordjs.token = env.token_beta
        else this.discordjs.token = env.token
    }
    
    #getInfos(){
        this.__resetDjs(true)
        let env = getCheck.bind(this)(".env")
        if(this.discordjs.lancementError) return
        if(!env.token) return this.discordjs.lancementError = "No token parameter in the .env file"
        if(typeof env.token !== "string") return this.discordjs.lancementError = "The token parameter in the .env file is not a string"
        this.#TreatToken(env)
        let config = getCheck.bind(this)("config.json")
        if(this.discordjs.lancementError) return
        if(!config.general) return this.discordjs.lancementError = "No general section in your config.json file"
        const availableLanguages = require("../constants").languagesAvailable
        if(!config.general.language || typeof config.general.language !== "string") this.default_language = "en-US"
        else if (availableLanguages.find(da => da.id === config.general.language)) this.default_language = config.general.language
        else this.default_language = "en-US"

        let languages = getCheck.bind(this)("langues", true)
        if(this.discordjs.lancementError) return
        
        languages[1] = languages[1].filter(e => e.endsWith(".json"))
        let toreturn = languages[1].map(e => JSON.parse(require("node:fs").readFileSync(process.cwd()+languages[0]+"langues"+languages[0]+e, 'utf-8')))

        if(!toreturn.find(e => e.Langue_Code === this.default_language)) return this.discordjs.lancementError = "There is no language file corresponding to your default language"

        for (const langue of toreturn){
            if(!langue["Langue_Code"]) return this.discordjs.lancementError = "In one of your language files, there is no code."
            if(!availableLanguages.find(da => da.id === langue["Langue_Code"]))  return this.discordjs.lancementError = `The code in ${langue["Langue_Code"]} file is wrong`
            for (const opt of ["Help", "Options", "Choices"]) if(!langue[opt]) return this.discordjs.lancementError = `No ${opt} in your ${langue["Langue_Code"]} file`
        }
        this.langues = toreturn

        let dbtr = {"general": config.general, "Dependencies": {}}
        if(config.dependencies){
            if(Array.isArray(config.dependencies)){
                config.dependencies.forEach(dependency => {
                    if(typeof dependency === "object"){
                        if((dependency.name && typeof dependency.name === "string") && (dependency.objects && Array.isArray(dependency.objects)) && (dependency.location && typeof dependency.location === "string") &&(dependency.path && typeof dependency.path === "string")){
                            if(["env", "original"].includes(dependency.location)){
                                if(!dbtr.Dependencies[dependency.name]) dbtr.Dependencies[dependency.name] = {}
                                dependency.objects.forEach(obj => {
                                    if(typeof obj === "string"){
                                        let result;
                                        if(dependency.location === "env") result = env
                                        if(dependency.location === "original") result = config
                                        let i=dependency.path.split("/")
                                        do{
                                            result = result[i[0]]
                                            i.shift()
                                        }while(result !== undefined && i.length !== 0)
                                        if(result && result[obj]){
                                            /*if(dependency.decrypt){
                                                if(dependency.decrypt_type && typeof dependency.decrypt_type === "string" && ["psw", "id"].includes(dependency.decrypt_type)){
                                                    if(dependency.decrypt_type === "id") dbtr.Dependencies[dependency.name][obj] = Crypt.decryptID(result[obj])
                                                    if(dependency.decrypt_type === "psw") dbtr.Dependencies[dependency.name][obj] = Crypt.decrypt(result[obj])
                                                }
                                            }
                                            else*/ dbtr.Dependencies[dependency.name][obj] = result[obj]
                                        }
                                    }
                                })
                            }
                        }
                    }
                })
            }
        }
        return dbtr

        function getCheck(name, state){
            const fs = require("node:fs")
            let symbol;
            if(require("node:os").platform() === "darwin") symbol = "/"
            else if (require("node:os").platform() === 'win32') symbol = "\\"
            let test = fs.existsSync(process.cwd()+symbol+name)
            if(!test){
                state ? this.discordjs.lancementError = `No folder ${name} in the files of the bot` : this.discordjs.lancementError = `No file ${name} in the files of the bot`
                return 
            }
            if(!state){
                var datas = fs.readFileSync(process.cwd()+symbol+name, "utf-8")
                try{
                    datas = JSON.parse(datas)
                }catch(err){
                    this.discordjs.lancementError = `There is an error in your folder ${name}`
                    return
                }
            }else return [symbol, fs.readdirSync(process.cwd()+symbol+name)]
            return datas
        }
    }
}

function get_events(){
    let path = require.resolve("../Events/CHANNEL_CREATE")
    let elementOS = path.includes("/") ? "/" : "\\"
    let splitPath = path.split(elementOS)
    splitPath.pop()
    let truePath = splitPath.map(e => {
        if(e === "") return elementOS
        return e
    }).join(elementOS)
    const fs = require("node:fs")
    return fs.readdirSync(truePath).filter(e => e.endsWith(".js")).map(e => e.split(".js")[0])
}

module.exports = Bot