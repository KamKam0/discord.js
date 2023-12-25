const Guilds = require("../managers/guilds")
const Users = require("../managers/users")
const Channels = require("../managers/channels")
const EventEmitter = require("node:events")
const Cooldown = require("@kamkam1_0/cooldown")
const CommandHandler = require("@kamkam1_0/discord-commandhandler")
const EventHandler = require("@kamkam1_0/discord-eventhandler")
const VoiceManager = require("../../handlers/voice/voicemanager")
const ApplicationCommands = require("../administrators/applicationcommands")
const WebSocketHandler = require('../../websocket/websocket')
const MessageAdministrator = require("../administrators/messages")
const Application = require("../singles/application")
const os = require('node:os')
let elementOS = '/'
if(os.platform() === "win32") elementOS = '\\'
const methodMe = require("../../methods/me")
const fs = require("node:fs")
const constants = require("../../utils/constants")
const utils = require("../../utils/functions")
const index = require("../../index")

class Bot extends EventEmitter{
    /**
     * 
     * @param {object} data 
     * @param {object|boolean} data.database
     * @param {number|undefined|string} data.intents
     * @param {boolean} data.systemLog
     * @param {boolean} data.eventsLog
     */
    constructor(data={}){
        super()

        this.state = "processing"
        this.presence = null
        this.user = null
        this.user_id = null
        this.creator = null
        this.utils = utils
        this.langues = []
        this.default_language = null
        this.token = null
        this.launchError = null
        this.availableEvents = this.#getEvents()
        this.intents = this.#attributeintents(data.intents)
        this.config = this.#getInfos()
        this.name = this.#checkName()
        this._collectors = []
        this.voice = new VoiceManager(this)
        this.messages = new MessageAdministrator(this)
        this.guilds = new Guilds(this)
        this.users = new Users(this)
        this.channels = new Channels(this)
        this.cooldown = new Cooldown()
        this.handler = new CommandHandler.Handlers(this.langues)
        this.events = new EventHandler.Events(this, this.availableEvents)
        this.commands = new ApplicationCommands(this)
        this.application = null
        this.ws = new WebSocketHandler(this, this.availableEvents)

        this.logs = {
            events: data.eventsLog ?? false,
            system: data.systemLog ?? true
        }
    }

    async login(presence){
        this.handler.deploy()
        this.events.deploy(presence)
        this.cooldown.Deploy(["global", "commands", "verif", "mention"])
        return this.ws.login(presence)
    }

    async getMe(){
        let informations = {
            bot: this,
            token: this.token
        }
        return methodMe.getuser(informations)
    }

    _setCreator(datas){
        if(!datas || typeof datas !== "object" || !datas.id || !datas.channel_id) return "invalid"
        this.creator = datas
        return this
    }

    _getConnection(presence){
        return {
            op: 2,
            d: {
                token: this.token,
                intents: this.intents,
                compress: false,
                properties: {
                    os: os.platform(),
                    browser: `@kamkam1_0/discord.js v${index.version}`,
                    device: `@kamkam1_0/discord.js v${index.version}`
                },
                shards: [ 0 ],
                presence: this.utils.general.presence(presence)
            }
        }
    }

    _handleCollectors(collector, collectorType, toDelete=false) {
        let collectorFound = null

        if (this._collectors.length) {
            collectorFound = this._collectors.find(collectorFinder => {
                let conditionToFind = this._compareCollectorProperty(collector.guild_id, collectorFinder.guild_id)
                && this._compareCollectorProperty(collector.channel_id, collectorFinder.channel_id)
                && this._compareCollectorProperty(collector.message_id, collectorFinder.message_id)
                && this._compareCollectorProperty(collector.interaction_id, collectorFinder.interaction_id)
                && this._compareCollectorProperty(collector.user_id, collectorFinder.user_id)
                && collectorFinder.type === collector.type
                && collectorFinder.collectorType === collectorType
    
                return conditionToFind
            })
        }

        if (!collectorFound) {
            this._collectors.push({...collector, collectorType})
            return false
        }

        if (toDelete) {
            this._collectors.splice(this._collectors.indexOf(collectorFound), 1)
        }

        return true
    }

    _compareCollectorProperty(collector, collectorFinder){
        if (!collector && !collectorFinder) {
            return true
        }

        if (typeof collector === 'string' && typeof collectorFinder === 'string' && collector === collectorFinder) {
            return true
        }

        if (Array.isArray(collector) && Array.isArray(collectorFinder)) {
            if (collector.length !== collectorFinder.length) {
                return false
            }

            if (collector.filter(collectorElement => !collectorFinder.find(collectorFinderElement => collectorFinderElement === collectorElement)).length !== collector.length) {
                return false
            }

            if (collectorFinder.filter(collectorFinderElement => !collector.find(collectorElement => collectorElement === collectorFinderElement)).length !== collectorFinder.length) {
                return false
            }

            return true
        }

        return false
    }

    #checkName(){
        let link = process.cwd().split(elementOS).filter(e => e.length > 0)
        return link[link.length - 1]
    }

    #TreatToken(env){
        if(env.token && env.token_beta && typeof env.token_beta === "string" && process.argv.includes("-t")) this.token = env.token_beta
        else this.token = env.token
    }

    #attributeintents(intents){
        if(!intents || !Array.isArray(intents) || intents.filter(e => typeof e === "string").length !== intents.length) return utils.gets.getIntentsFromNames("ALL")
        return utils.gets.getIntentsFromNames(intents)
    }
    
    #getInfos(){
        if(this.launchError) return
        let env = getCheck.bind(this)(".env")
        if(this.launchError) return
        if(!env.token) return this.launchError = "No token parameter in the .env file"
        if(typeof env.token !== "string") return this.launchError = "The token parameter in the .env file is not a string"
        this.#TreatToken(env)
        let config = getCheck.bind(this)("config.json")
        if(this.launchError) return
        if(!config.general) return this.launchError = "No general section in your config.json file"
        const availableLanguages = constants.languagesAvailable
        if(!config.general.language || typeof config.general.language !== "string") return this.launchError = "No default language"
        else if (availableLanguages.find(da => da.id === config.general.language)) this.default_language = config.general.language
        else  return this.launchError = "No valid default language"

        let languages = getCheck.bind(this)("langues", true)
        if(this.launchError) return
        
        languages = languages.filter(e => e.endsWith(".json"))
        let toreturn = languages.map(e => JSON.parse(fs.readFileSync(process.cwd()+elementOS+"langues"+elementOS+e, 'utf-8')))

        if(!toreturn.find(e => e.languageCode === this.default_language)) return this.launchError = "There is no language file corresponding to your default language"

        for (const langue of toreturn){
            if(!langue["languageCode"]) return this.launchError = "In one of your language files, there is no code."
            if(!availableLanguages.find(da => da.id === langue["languageCode"]))  return this.launchError = `The code in ${langue["languageCode"]} file is wrong`
            for (const opt of ["commands", "options", "choices"]) if(!langue[opt]) return this.launchError = `No ${opt} in your ${langue["languageCode"]} file`
        }
        this.langues = toreturn

        let dbtr = {"general": config.general, "dependencies": {}}
        if(config.dependencies && Array.isArray(config.dependencies)){
            config.dependencies.forEach(dependency => {
                if(typeof dependency !== "object" || !["env", "original"].includes(dependency.location) || typeof dependency.path !== "string" || typeof dependency.name !== "string" ) return
                if(dependency.objects && (!Array.isArray(dependency.objects) || !dependency.objects[0])) return
                let splittedPath = dependency.path.split("/")
                let searchArea;
                if(dependency.location === "env") searchArea = env
                if(dependency.location === "original") searchArea = config
                let lastElement;
                for (let pathElement of splittedPath){
                    let localPathElement = searchArea[pathElement]
                    if(!localPathElement) return;
                    lastElement = localPathElement
                }

                if(dependency.objects){
                    dbtr.dependencies[dependency.name] = {};
                    dependency.objects.forEach(obj => {
                        if(typeof obj !== "string" || !lastElement[obj]) return
                        dbtr.dependencies[dependency.name][obj] = lastElement[obj]
                    })
                }else{
                    dbtr.dependencies[dependency.name] = lastElement;
                }
            })
        }
        return dbtr

        function getCheck(name, state){
            let test = fs.existsSync(process.cwd()+elementOS+name)
            if(!test){
                state ? this.launchError = `No folder ${name} in the files of the bot` : this.launchError = `No file ${name} in the files of the bot`
                return 
            }
            if(!state){
                var datas = fs.readFileSync(process.cwd()+elementOS+name, "utf-8")
                if (name === '.env') {
                    try{
                        datas = JSON.parse(datas)
                    }catch(err){
                        let envContent = datas
                        .split('\n')
                        .filter(line => line.length && line !== '\r' && line.includes('='))
                        if (envContent.length) {
                            envContent = envContent
                            .map(line => line.split('#'))
                            .filter(line => line[0].length)
                        }
                        if (envContent.length) {
                            envContent = envContent
                            .map(line => line[0].split('\r').join(''))
                        }
                        datas = {}
                        envContent.forEach(envLine => {
                            datas[envLine.split('=')[0]] = envLine.split('=')[1]
                        })
                    }
                } else {
                    try{
                        datas = JSON.parse(datas)
                    }catch(err){
                        this.launchError = `There is an error in your folder ${name}`
                        return
                    }
                }
            }else return fs.readdirSync(process.cwd()+elementOS+name)
            return datas
        }
    }

    #getEvents(){
        let path = require.resolve("../../websocket/events/CHANNEL_CREATE")
        let splitPath = path.split(elementOS)
        splitPath.pop()
        let truePath = splitPath.map(e => {
            if(e === "") return elementOS
            return e
        }).join(elementOS)
        const fs = require("node:fs")
        return fs.readdirSync(truePath).filter(e => e.endsWith(".js")).map(e => e.split(".js")[0])
    }
}

module.exports = Bot