const Guilds = require("../Managers/Guilds")
const Users = require("../Managers/Users")
const Channels = require("../Managers/Channels")
const EventEmitter = require("node:events")
const Cooldown = require("@kamkam1_0/cooldown")
const CommandHandler = require("@kamkam1_0/discord-commandhandler")
const EventHandler = require("@kamkam1_0/discord-eventhandler")
const VoiceManager = require("./VoiceManager")
const ORM = require("@kamkam1_0/sql-orm")
class Bot extends EventEmitter{
    constructor(intents, elements){
        super()
        this.langues = []
        this.intents = this.#attributeintents(intents)
        this.default_language = null
        this.discordjs = {ws: null, lastEvent: null, interval: null, lastACK: null, session_id: null, HBinterval: null, dvdatas: null, lancement: null, guild_ids: [], available_ids: [], interval_state: null, token: null, lastPing: -1, reconnection_url: null}
        this.config = this.#GetDB()
        this.name = this.#checkName()
        this.sql = this.#attributeSQL(intents, elements)
        this.guilds = new Guilds(this)
        this.users = new Users(this)
        this.channels = new Channels(this)
        this.state = "processing"
        this.cooldown = new Cooldown()
        this.handler = new CommandHandler.Handlers(this.name, this.langues)
        this.events = new EventHandler.Events(this, get_events())
        this.presence = null
        this.user = null
        this.creator = null
        this.voice = new VoiceManager(this)
        this.utils = require("../Utils/functions")
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
            if(!this.database_state || this.database_state === "unstable") return reject(new Error("La connexion avec la BDD sql n'est pas initialisée - bot"))
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
        if(require("os").platform() === "darwin") symbol = "/"
        else if (require("os").platform() === 'win32') symbol = "\\"
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

    DeleteSlashCommand(options){
        return new Promise(async (resolve, reject) => {
            if(!this.user){
                let ID2 = await this.GetMe()
                this.user = ID2
            }
            require("../Methods/interaction").deletecommand(this.discordjs.token, this.user.id, options, this)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    CreateSlashCommand(options){
        return new Promise(async (resolve, reject) => {
            if(!this.user){
                let ID2 = await this.GetMe()
                this.user = ID2
            }
            require("../Methods/interaction").createcommand(this.discordjs.token, this.user.id, options, this)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    ModifySlashCommand(options){
        return new Promise(async (resolve, reject) => {
            if(!this.user){
                let ID2 = await this.GetMe()
                this.user = ID2
            }
            require("../Methods/interaction").modifycommand(this.discordjs.token, this.user.id, options, this)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    GetSlashCommands(ID){
        return new Promise(async (resolve, reject) => {
            if(!this.user){
                let ID2 = await this.GetMe()
                this.user = ID2
            }
            require("../Methods/interaction").getcommands(this.discordjs.token, this.user.id, ID, this)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    GetMe(){
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
                properties: {
                    os: require("os").platform(),
                    browser: "Darkness-Group_own-module",
                    device: "Darkness-Group_own-module"
                },
                shards: [ 0 ],
                presence: require("../Utils/functions").presence(presence)
            }
        }
    }

    SetStatus(options){
        let presence = require("../Methods/me").setstatus(this, options)
        this.events.presence = presence
        return presence
    }

    SetActivity(options){
        let presence = require("../Methods/me").setactivity(this, options)
        this.events.presence = presence
        return presence
    }

    SetPresence(options){
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
        if(error.length !== 0) return {status: false, errors: error}
        else return {status: true}
    }

    
    async CheckCommands(){
        let commands = await this.GetSlashCommands()
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
            let datas  = new commandClass({name: commande.name, description: commande.description, options: commande.help.options || [], nsfw: commande.help.nsfw || undefined, description_localizations: descriptions_cmd, name_localizations: names_cmd, dm_perm: commande.help.type, mem_perm: commande.help.autorisation})
            if(!cmd) this.CreateSlashCommand(datas)
            else{
                if(!datas.compare(cmd)) this.ModifySlashCommand(datas)
                commands = commands.__DeleteCommand(cmd.name)
            }
        })
        if(commands.length > 0) commands.container.forEach(cmd => this.DeleteSlashCommand(cmd.id))

    }

    #TreatToken(env){
        if(env.token && env.token_beta && typeof env.token_beta === "string" && process.argv.includes("-t")) this.discordjs.token = env.token_beta
        else this.discordjs.token = env.token
    }
    
    #GetDB(){
        let env = getCheck(".env")
        if(!env.token){
            console.log("Pas de paramètre token dans votre .env")
            process.exit()
        }
        if(typeof env.token !== "string"){
            console.log("Le token présente dans votre .env n'est pas un string")
            process.exit()
        }
        this.#TreatToken(env)
        let config = getCheck("config.json")
        if(!config.general){
            console.log("Pas de sections general dans votre config.json")
            process.exit()
        }
        const availableLanguages = require("../constants").languagesAvailable
        if(!config.general.language || typeof config.general.language !== "string") this.default_language = "en-US"
        else if (availableLanguages.find(da => da.id === config.general.language)) this.default_language = config.general.language
        else this.default_language = "en-US"

        let languages = getCheck("langues", true)
        
        languages[1] = languages[1].filter(e => e.endsWith(".json"))
        let toreturn = languages[1].map(e => JSON.parse(require("fs").readFileSync(process.cwd()+languages[0]+"langues"+languages[0]+e, 'utf-8')))

        if(!toreturn.find(e => e.Langue_Code === this.default_language)){
            console.log("Aucun fichier de langue ne correspond à votre language par défaut")
            process.exit()
        }

        toreturn.forEach(langue => {
            if(!langue["Langue_Code"]){
                console.log("Aucun code de language présent dans un de vos fichiers langues")
                process.exit()
            }
            if(!availableLanguages.find(da => da.id === langue["Langue_Code"])){
                console.log(`Le Code de language dans votre fichier de langue ${langue["Langue_Code"]} est erroné`)
                process.exit()
            }
            ["Help", "Options", "Choices"].forEach(opt => {
                if(!langue[opt]){
                    console.log(`Aucun ${opt} dans votre fichier de langue ${langue["Langue_Code"]}`)
                    process.exit()
                }
            })
        })
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
            const fs = require("fs")
            let symbol;
            if(require("os").platform() === "darwin") symbol = "/"
            else if (require("os").platform() === 'win32') symbol = "\\"
            let test = fs.existsSync(process.cwd()+symbol+name)
            if(!test){
                state ? console.log(`Aucun dossier ${name} présent dans les fichiers du bot`) : console.log(`Aucun fichier ${name} présent dans les fichiers du bot`)
                process.exit()
            }
            if(!state){
                var datas = fs.readFileSync(process.cwd()+symbol+name, "utf-8")
                try{
                    datas = JSON.parse(datas)
                }catch(err){
                    console.log(`une erreur est constatée dans votre fichier ${name}`)
                    process.exit()
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
    const fs = require("fs")
    return fs.readdirSync(truePath).filter(e => e.endsWith(".js")).map(e => e.split(".js")[0])
}

module.exports = Bot