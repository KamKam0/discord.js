const Guilds = require("../Managers/Guilds")
const Users = require("../Managers/Users")
const Channels = require("../Managers/Channels")
const EventEmitter = require("node:events")
const Cooldown = require("@kamkam1_0/discord-cooldown")
const CommandHandler = require("@kamkam1_0/discord-commandhandler")
const EventHandler = require("@kamkam1_0/discord-eventhandler")
const VoiceManager = require("./VoiceManager")
const ORM = require("@kamkam1_0/sql-orm")
class Bot extends EventEmitter{
    constructor(elements){
        super()
        this.langues = []
        this.default_language = null
        this.discordjs = {ws: null, lastEvent: null, interval: null, lastACK: null, session_id: null, HBinterval: null, dvdatas: null, lancement: null, guild_ids: [], available_ids: [], interval_state: null, token: null, awaitMessages: [], awaitEmojis: [], lastPing: -1, reconnection_url: null}
        this.config = this.GetDB()
        this.name = this.checkName()
        this.sql = new ORM({host: "127.0.0.1", port: 3306, user: "root", database: this.name})
        this.guilds = new Guilds(this)
        this.users = new Users(this)
        this.channels = new Channels(this)
        this.state = "processing"
        this.cooldown = new Cooldown.Cooldowns()
        this.handler = new CommandHandler.Handlers(this.name, this.langues)
        this.events = new EventHandler.Events(this, get_events())
        this.presence = null
        this.user = null
        this.creator = null
        this.voice = new VoiceManager(this)
        this.utils = require("../Utils/functions")
    }

    get database_state(){
        if(this.sql.connectionState) return "stable"
        return "unstable"
    }

    checksql(message){
        if(!message) return "no message"
        message = String(message)
        let valide;
        if(message.includes('WHERE')) valide = "error"
        let check = ['select', 'from', 'create', 'database', 'insert', 'table', 'into', 'delete', 'drop', 'update', 'set', 'truncate', 'use', 'alter', 'lock', 'unlock', 'execute', 'grant', 'revoke', 'replicate', 'synchronize', "'", '"', '`', "//", "--"]
        check.forEach(ch => {
            if(message.includes(ch)) valide = "error"
        })
        if(!valide) return "complete"
        else return "error"
    }

    ms(number){
        if(number === 0) return 0
        if(!number) return 'Invalid Number'
        number = String(number).toLowerCase()
        if(isNaN(number) && !number.endsWith("d")  && !number.endsWith("j") && !number.endsWith("h") && !number.endsWith("m") && !number.endsWith("s")) return 'Invalid Number'
        if(number.endsWith("d") || number.endsWith("j")) return Number(`${number.endsWith("d") ? number.split("d")[0] : number.split("j")[0]}`) * 24 * 60 * 60 * 1000
        if(number.endsWith("h")) return number.split("h")[0] * 60 * 60 * 1000
        if(number.endsWith("m")) return number.split("m")[0] * 60 * 1000
        if(number.endsWith("s")) return number.split("s")[0] * 1000
        return Number(number)
    }


    vstatus(bot, VID){
        return new Promise((resolve, reject) => {
            if(!bot.sql) return reject(new Error("La connexion avec la BDD sql n'est pas initialisée - bot"))
            if(!VID) return reject(new Error("Incorrect infos"))
            if(VID === this.config.general["ID createur"]) return resolve("ALL")
            else if(bot.sql){
                bot.sql.query(`SELECT * FROM admin`, async function(err, admin){
                    bot.sql.query(`SELECT * FROM vip`, async function(err, vip){
                        if(admin && admin[0] && vip && vip[0]){
                            if(admin.find(c => c.ID === VID) && vip.find(c => c.ID === VID)) return resolve("ALL")
                            else{
                                if(admin.find(c => c.ID === VID)) return resolve("Admin")
                                else if(vip.find(c => c.ID === VID)) return resolve("VIP")
                                else return resolve("User")
                            }  
                        }else if(admin && admin[0]){
                            if(admin.find(c => c.ID === VID)) return resolve("Admin")
                            else return resolve("User")
                        }else if(vip && vip[0]){
                            if(vip.find(c => c.ID === VID)) return resolve("VIP")
                            else return resolve("User")
                        }else return resolve("User")
                    })
                })
            }
        })
    }

    ven(bot, ID){
        return new Promise((resolve, reject) => {
            return resolve(ID)
            if(bot.sql){
                bot.sql.query("SELECT * FROM general", function(err, result){
                    let vid = result.find(re => re.ID === ID)
                    if(!vid || !vid.ID) vid = {ID: ID, Language: "fr"}
                    return resolve(vid)
                })
            }else return resolve(ID)
        })
    }

    setCreator(datas){
        if(!datas || typeof datas !== "object" || !datas.id || !datas.channel_id) return "invalid"
        this.creator = datas
        return this
    }

    checkName(){
        let link = process.cwd()
        let symbol;
        if(require("os").platform() === "darwin") symbol = "/"
        else if (require("os").platform() === 'win32') symbol = "\\"
        link = link.split(symbol).filter(e => e.length > 0)
        return link[link.length - 1]
    }

    Login(presence){
        this.handler.Deploy()
        this.events.Deploy()
        this.cooldown.Deploy()
        return new Promise(async (resolve, reject) => {
            require("../bot_manage").login(this, presence)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - Login")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    AwaitMesssages(channelid, options){
        return new Promise(async (resolve, reject) => {
            require("../Methods/channel").awaitMessages(this, channelid, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - AwaitMessages")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    warn(msg, id){
        return new Promise(async (resolve, reject) => {
            let embed = new (require("./Embed"))()
            .setDescription(`❗️ | ${msg}`)
            .setColor("ORANGE")
            if(!type) type = "reply"
            this.users.get(id).send({embeds: [embed]})
            .then(obj => {
                if(obj !== undefined) resolve(obj)
            })
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - msgReponseWarn")
                er.content = err
                reject(er)
            })
        })
    }

    DeleteSlashCommand(options){
        return new Promise(async (resolve, reject) => {
            if(!this.user){
                let ID2 = await this.GetMe()
                this.user = ID2
            }
            require("../Methods/interaction").deletecommand(this.discordjs.token, this.user.id, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - DeleteSlashCommandBot")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    CreateSlashCommand(options){
        return new Promise(async (resolve, reject) => {
            if(!this.user){
                let ID2 = await this.GetMe()
                this.user = ID2
            }
            require("../Methods/interaction").createcommand(this.discordjs.token, this.user.id, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête CreaslashCommandBot")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    ModifySlashCommand(options){
        return new Promise(async (resolve, reject) => {
            if(!this.user){
                let ID2 = await this.GetMe()
                this.user = ID2
            }
            require("../Methods/interaction").modifycommand(this.discordjs.token, this.user.id, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - ModifySlashcommandbot")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    GetSlashCommands(ID){
        return new Promise(async (resolve, reject) => {
            if(!this.user){
                let ID2 = await this.GetMe()
                this.user = ID2
            }
            require("../Methods/interaction").getcommands(this.discordjs.token, this.user.id, ID)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - getslashcommandbot")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    GetMe(){
        return new Promise(async (resolve, reject) => {
            require("../Methods/me").getuser(this.discordjs.token)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - getme")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    get_connection(presence){
        return {
            op: 2,
            d: {
                token: this.discordjs.token,
                intents: require("../Utils/functions").get_intents_n("ALL"),
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
        return require("../Methods/me").setstatus(this, options)
    }

    SetActivity(options){
        return require("../Methods/me").setactivity(this, options)
    }

    SetPresence(options){
        console.log("set presence - bot")
        console.log(new Date(Date.now()).toLocaleString())
        return require("../Methods/me").setpresence(this, options)
    }
    
    SendMessage(channelid, options){
        return new Promise(async (resolve, reject) => {
            require("../Methods/message").send(this.discordjs.token, channelid, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - SendMessages Bot")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
    
    ModifyMessage(channelid, messageid, options){
        return new Promise(async (resolve, reject) => {
            require("../Methods/message").modify(this.discordjs.token, channelid, messageid, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - ModifyMessageBot")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
    
    DeleteMessage(channelid, options){
        return new Promise(async (resolve, reject) => {
            require("../Methods/message").delete(this.discordjs.token, channelid, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - DeleteMessageBot")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    Initiate(){
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
        const Langue = this.langues.find(e => e.Langue_Code === this.default_language)["Help"]

        this.handler.GetAllCommandsfi().filter(cmd => !cmd.help.unclass && !cmd.help.nsfw).forEach(commande => {
            let descriptions_cmd = {}
            let names_cmd = {}
            let descriptions_opt = {}
            let names_opt = {}
            let names_cho = {}
            /*
                Object.defineProperty(description_cmd, la.Langue_Code, {
                    value: la.Help[`${cmd.name}_description`],
                    writable: false
                })*/
            this.langues.forEach(la => {
                descriptions_cmd[la.Langue_Code] = la.Help[`${commande.name}_description`]
                names_cmd[la.Langue_Code] = la.Help[`${commande.name}_name`]
                if(commande.help.options) commande.help.options.forEach(option => {
                    if(la.Langue_Code === "en-US") option.description = la.Options[`${commande.name}_${option.name}_description`]
                    descriptions_opt[la.Langue_Code] = la.Options[`${commande.name}_${option.name}_description`]
                    names_opt[la.Langue_Code] = la.Options[`${commande.name}_${option.name}_name`]
                    if(option.choices) option.choices.forEach(choice => names_cho[la.Langue_Code] = la.Choices[`${commande.name}_${option.name}_${choice.name}_name`] )
                })
            })

            let cmd = commands.find(cmd => cmd.name === commande.name)
            if(!cmd) this.CreateSlashCommand({name: commande.name, description: Langue[`${commande.name}_description`], options: commande.help.options ? commande.help.options : []})
            else{
                let truecmd = new commandClass({name: commande.name, description: Langue[`${commande.name}_description`], options: commande.help.options ? commande.help.options : [], description_localizations: descriptions_cmd, name_localizations: names_cmd, dm_perm: commande.help.type, mem_perm: commande.help.autorisation})
                if(!truecmd.compare(cmd)) this.ModifySlashCommand(truecmd)
                commands = commands.DeleteCommand(cmd.name)
            }
        })
        if(commands.length > 0) commands.commands.forEach(cmd => this.DeleteSlashCommand(cmd.id))
    }

    TreatToken(env){
        if(env.token && env.token_beta && typeof env.token_beta === "string" && process.argv.includes("-t")) this.discordjs.token = env.token_beta
        else this.discordjs.token = env.token
    }
    
    GetDB(){
        let env = getCheck(".env")
        if(!env.token){
            console.log("Pas de paramètre token dans votre .env")
            process.exit()
        }
        if(typeof env.token !== "string"){
            console.log("Le token présente dans votre .env n'est pas un string")
            process.exit()
        }
        this.TreatToken(env)
        let config = getCheck("config.json")
        if(!config.general){
            console.log("Pas de sections general dans votre config.json")
            process.exit()
        }
        if(!config.general.language || typeof config.general.language !== "string") this.default_language = "en"
        else this.default_language = config.general.language
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