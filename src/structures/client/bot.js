const Guilds = require("../Managers/Guilds")
const Users = require("../Managers/Users")
const Channels = require("../Managers/Channels")
const EventEmitter = require("node:events")
const Cooldown = require("@kamkam1_0/cooldown")
const CommandHandler = require("@kamkam1_0/discord-commandhandler")
const EventHandler = require("@kamkam1_0/discord-eventhandler")
const VoiceManager = require("../../handlers/voice/voicemanager")
const ApplicationCommands = require("../applicationscommands/command")
const ORM = require("@kamkam1_0/sql-orm")
const WebSocketHandler = require('../../handlers/websocket')
const collector = require("../../handlers/collector")
const os = require('node:os')
let elementOS = '/'
if(os.platform() === "win32") elementOS = '\\'
const methodMe = require("../../methods/me")
const methodMessage = require("../../methods/message")
const fs = require("node:fs")

class Bot extends EventEmitter{
    /**
     * 
     * @param {object} data 
     * @param {object|boolean} data.database
     * @param {number|undefined} data.intents
     */
    constructor(data={}){
        super()

        this.langues = []
        this.intents = this.#attributeintents(data.intents)
        this.default_language = null
        this.ws.discordSide = {}
        this.config = this.#getInfos()
        this.name = this.#checkName()
        this.sql = this.#attributeSQL(data.database)
        this.guilds = new Guilds(this)
        this.users = new Users(this)
        this.channels = new Channels(this)
        this.commands = new ApplicationCommands(this)
        this.state = "processing"
        this.cooldown = new Cooldown()
        this.handler = new CommandHandler.Handlers(this.name, this.langues)
        this.events = new EventHandler.Events(this, this.ws.discordSide.availableEvents)
        this.presence = null
        this.user = null
        this.creator = null
        this.voice = new VoiceManager(this)
        this.utils = require("../../utils/functions")
        this.ws = new WebSocketHandler(this)
    }

    #attributeintents(intents){
        if(!intents || !Array.isArray(intents) || intents.filter(e => typeof e === "string").length !== intents.length) return require("../../utils/functions").get_intents_n("ALL")
        return require("../../utils/functions").get_intents_n(intents)
    }

    #attributeSQL(database){
        if(!database) return false
        if(typeof database === "boolean") return new ORM({host: "127.0.0.1", port: 3306, user: "root", database: this.name})
        else if (typeof database === "object") return new ORM(database)
        else return false
    }

    get database_state(){
        if(!this.sql) return false
        if(this.sql.connectionState) return "stable"
        return "unstable"
    }

    _userStatus(ID){
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
                if(tables.includes("admin")) admin = await this.sql.select("admin", {ID})
                if(tables.includes("vip")) vip = await this.sql.select("vip", {ID})
                if(admin && admin[0]) value += 2
                if(vip && vip[0]) value += 1
                return resolve({...returnInfos, value})
            }
            return resolve({...returnInfos, value: 0})
        })
    }

    _setCreator(datas){
        if(!datas || typeof datas !== "object" || !datas.id || !datas.channel_id) return "invalid"
        this.creator = datas
        return this
    }

    async awaitInteractions(options){
        return new Promise((resolve, reject) => {
            collector(this, "interaction", {channel_id: options.channel_id || null, guild_id: options.guild_id || null, message_id: options.message_id || null, interaction_id: options.id || null}, options)
            .then(datas => resolve(datas))
            .catch(datas => reject(datas))
        })
    }

    collectInteractions(options){
        return collector.collect(this, "interaction", {channel_id: options.channel_id || null, guild_id: options.guild_id || null, message_id: options.message_id || null, interaction_id: options.id || null}, options)
    }

    #checkName(){
        let link = process.cwd().split(elementOS).filter(e => e.length > 0)
        return link[link.length - 1]
    }

    async login(presence){
        this.handler.Deploy()
        this.events.Deploy(presence)
        this.cooldown.Deploy(["global", "commands", "verif", "mention"])
        return this.ws.login()
    }

    getMe(){
        let informations = {
            bot: this,
            token: this.ws.discordSide.token
        }
        return methodMe.getuser(informations)
    }

    _getConnection(presence){
        return {
            op: 2,
            d: {
                token: this.ws.discordSide.token,
                intents: this.intents,
                compress: false,
                properties: {
                    os: os.platform(),
                    browser: `@kamkam1_0/discord.js v${require("../index").version}`,
                    device: `@kamkam1_0/discord.js v${require("../index").version}`
                },
                shards: [ 0 ],
                presence: this.utils.presence(presence)
            }
        }
    }

    setStatus(options){
        let presence = methodMe.setstatus(this, options)
        this.events.presence = presence
        return presence
    }

    setActivity(options){
        let presence = methodMe.setactivity(this, options)
        this.events.presence = presence
        return presence
    }

    setPresence(options){
        let presence =  methodMe.setpresence(this, options)
        this.events.presence = presence
        return presence
    }
    
    sendMessage(channelid, options){
        let informations = {
            bot: this,
            token: this.ws.discordSide.token,
            channel_id: channelid
        }
        return methodMessage.send(informations, options)
    }
    
    modifyMessage(channelid, messageid, options){
        let informations = {
            bot: this,
            token: this.ws.discordSide.token,
            channel_id: channelid,
            message_id: messageid
        }
        return methodMessage.modify(informations, options)
    }
    
    deleteMessage(channelid, messageid, options){
        let informations = {
            bot: this,
            token: this.ws.discordSide.token,
            channel_id: channelid,
            message_id: messageid
        }
        return methodMessage.delete(informations, options)
    }

    #TreatToken(env){
        if(env.token && env.token_beta && typeof env.token_beta === "string" && process.argv.includes("-t")) this.ws.discordSide.token = env.token_beta
        else this.ws.discordSide.token = env.token
    }
    
    #getInfos(){
        this.ws.resetDiscordSide()
        let env = getCheck.bind(this)(".env")
        if(this.ws.discordSide.lancementError) return
        if(!env.token) return this.ws.discordSide.lancementError = "No token parameter in the .env file"
        if(typeof env.token !== "string") return this.ws.discordSide.lancementError = "The token parameter in the .env file is not a string"
        this.#TreatToken(env)
        let config = getCheck.bind(this)("config.json")
        if(this.ws.discordSide.lancementError) return
        if(!config.general) return this.ws.discordSide.lancementError = "No general section in your config.json file"
        const availableLanguages = require("../../utils/constants").languagesAvailable
        if(!config.general.language || typeof config.general.language !== "string") this.default_language = "en-US"
        else if (availableLanguages.find(da => da.id === config.general.language)) this.default_language = config.general.language
        else this.default_language = "en-US"

        let languages = getCheck.bind(this)("langues", true)
        if(this.ws.discordSide.lancementError) return
        
        languages = languages.filter(e => e.endsWith(".json"))
        let toreturn = languages.map(e => JSON.parse(fs.readFileSync(process.cwd()+elementOS+"langues"+elementOS+e, 'utf-8')))

        if(!toreturn.find(e => e.Langue_Code === this.default_language)) return this.ws.discordSide.lancementError = "There is no language file corresponding to your default language"

        for (const langue of toreturn){
            if(!langue["Langue_Code"]) return this.ws.discordSide.lancementError = "In one of your language files, there is no code."
            if(!availableLanguages.find(da => da.id === langue["Langue_Code"]))  return this.ws.discordSide.lancementError = `The code in ${langue["Langue_Code"]} file is wrong`
            for (const opt of ["Help", "Options", "Choices"]) if(!langue[opt]) return this.ws.discordSide.lancementError = `No ${opt} in your ${langue["Langue_Code"]} file`
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
                                            dbtr.Dependencies[dependency.name][obj] = result[obj]
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
            let test = fs.existsSync(process.cwd()+elementOS+name)
            if(!test){
                state ? this.ws.discordSide.lancementError = `No folder ${name} in the files of the bot` : this.ws.discordSide.lancementError = `No file ${name} in the files of the bot`
                return 
            }
            if(!state){
                var datas = fs.readFileSync(process.cwd()+elementOS+name, "utf-8")
                try{
                    datas = JSON.parse(datas)
                }catch(err){
                    this.ws.discordSide.lancementError = `There is an error in your folder ${name}`
                    return
                }
            }else return fs.readdirSync(process.cwd()+elementOS+name)
            return datas
        }
    }
}

module.exports = Bot