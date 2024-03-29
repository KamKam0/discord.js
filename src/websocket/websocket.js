const Initiate = require("../handlers/initiate")
const utils = require('../utils/functions')
const constants = require('../utils/constants')
const applicationMethods = require('../methods/application')
const createError = require("../utils/functions").general.createError
const ws = require("ws")
const { getGateway } = require("../methods/me")
const { createDM } = require("../methods/user")
const ms = require("@kamkam1_0/ms")

class WebsocketHandler{
    #internetInterval
    #internetConnectionErrorWarn
    constructor(bot, events){
        this._bot = bot
        this.#internetInterval = 60 / 12
        this.internetConnectionError = null,
        this.#internetConnectionErrorWarn = false,
        this.discordSide = {
            ws: null,
            commandsChecked: null,
            lastEvent: null,
            interval: null,
            lastACK: null,
            session_id: null,
            HBinterval: null,
            dvdatas: null,
            lancement: null,
            guild_ids: [],
            available_ids: [],
            intervalState: null,
            lastPing: -1,
            reconnection_url: null,
            token: null,
            passedDatas: null,
            connectionInfos: {
                connectionUrl: null,
                connectionNumber: null,
                shardAdvised: null
            },
            timeoutGuildCreate: null
        }
        this.initiate = new Initiate(bot)
        this.events = this.getEventsRequired(events)
    }

    getEventsRequired(events){
        let arrayToReturn = []
        events.forEach(eventName => {
            arrayToReturn.push({
                name: eventName,
                execute: require(`./events/${eventName}`)
            })
        })
        return arrayToReturn
    }

    async #connectionURL(){
        return new Promise(async (resolve, reject) => {
            let trueurl;
            if(!this.discordSide.connectionInfos.connectionUrl){
                const basedatas = await getGateway(this._bot.token).catch(err => reject(err))
                if(!basedatas) return
                this.discordSide.connectionInfos = {
                    connectionUrl: `${basedatas.url}/?v=10&encoding=json`,
                    connectionNumber: basedatas.session_start_limit.remaining,
                    shardAdvised: basedatas.shards
                }
                trueurl = this.discordSide.connectionInfos.connectionUrl
            }else if (this._bot.state === "reconnect") trueurl = this.discordSide.reconnection_url
            else trueurl = this.discordSide.connectionInfos.connectionUrl

            return resolve(trueurl)
        })
    }

    async #getApplication(){
        return new Promise(async (resolve, reject) => {
            let informations = {
                botToken: this._bot.token,
                bot: this._bot,
            }

            applicationMethods.getMe(informations)
            .then(applicationData => {
                this._bot.application = applicationData
                this._bot.user_id = applicationData.id
                return resolve(true)
            })
            .catch(err => {
                if(err.type == "system" && err.code === "internet") return reject(err)
                return resolve(null)
            })
        })
    }

    async #handleCreator(){
        return new Promise(async (resolve, reject) => {
            this.discordSide.lancement = Date.now()
            let sentInformation = {
                botToken: this._bot.token,
                bot: this._bot
            }
            createDM(sentInformation, this._bot.config.general["creatorId"])
            .then(us => {
                this._bot._setCreator({id: us.recipients[0].id, channel_id: us.id})
                return resolve(null)
            })
            .catch(err => {
                if(err.type == "system" && err.code === "internet") return reject(err)
                return resolve(null)
            })
        })
    }

    async login(presence){
        return new Promise(async (resolve, reject) => {
            if(this.discordSide.lancement && this._bot.state === "processing") return reject(createError("Cannot start the bot twice", {state: false, message: "You already started the bot once at " + new Date(this.discordSide.lancement).toDateString()}))
            if(this._bot.launchError) return reject(createError("Error with configuration", {state: false, message: this._bot.launchError}))

            this.#connectionURL()
            .then(connectionURL => {
                this.#getApplication()
                .then(() => {
                    const processedIntents = utils.gets.getIntents(this._bot.intents)
                    let priviledgeBotIntents = processedIntents.filter(intent => constants.priviledgedIntents.find(priviledge => priviledge.intentName === intent))
                    if (priviledgeBotIntents.length) {
                        let priviledgeBotIntentsDeclared = this._bot.application.flags.filter(flag => constants.priviledgedIntents.find(priviledge => priviledge.flagName === flag))
                        if (priviledgeBotIntents.length !== priviledgeBotIntentsDeclared.length) {
                            console.log('\x1b[31mTry to check if the intents you gave correspond to the ones in the developer portal.\x1b[37m')
                            return
                        }
                    }
                    this.#handleCreator()
                    .then(() => {
                        this.initiate.init()
                        .then(() => {
                            if(this.internetConnectionError){
                                if(this._bot.logs.system){
                                    let timeOut = Date.now() - this.internetConnectionError
                                    console.info(`\n\x1b[32mDiscord.js: Internet connection reinstated [${new Date(Date.now()).toUTCString()}]\x1b[37m`)
                                    console.info(`\x1b[32mDiscord.js: The outage lasted ${ms(timeOut)}\x1b[37m`)
                                }
                                this.internetConnectionError = null
                                this.#internetConnectionErrorWarn = false
                            }
                            if(this.discordSide.connectionInfos.connectionNumber === 0) return reject(createError("Could not log in", {state: false, message: "You reached the maximum of daily connection"})) 
                            const WebSocket = new ws(connectionURL)
                            if(!WebSocket) return reject(createError("Incorrect Infos"))
                            this.discordSide.ws = WebSocket
                            let bodyLogin;
    
                            if(this._bot.state !== "reconnect"){
                                bodyLogin = this._bot._getConnection((this._bot.presence || presence))
                                this._bot.presence = bodyLogin.d.presence
                            }
                            this.discordSide.connectionInfos.connectionNumber --
                            this.#handleWebsocketCalls(bodyLogin)
    
                            return resolve({result: this._bot, message: "Bot Launched", state: true})
                        })
                        .catch(err => {
                            let error = this.#handleError(err)
                            if(error.content && this._bot.logs.system) return console.log(`\x1b[31mDiscord.js: ${error.content}\x1b[37m`)
                        })
                    })
                    .catch(err => {
                        let error = this.#handleError(err)
                        if(error.content) {
                            if (this._bot.logs.system) console.log('\x1b[31mDiscord.js: Cannot create a DM channel with the given creator ID.\nPlease provide a way to do so (a server in common\x1b[37m')
                            return reject(error)
                        }
                    })
                })
                .catch(err => {
                    let error = this.#handleError(err)
                    if(error.content) return reject(error)
                })
            })
            .catch(err => {
                let error = this.#handleError(err)
                if(error.content) return reject(error)
            })
        })
    }

    #handleError(err){
        if(err === null){
            let error = new Error('Invalid commands data')
            error.content = 'One of your commands does not pass through the securities. Please look at your DMs to understand the error.'
            return error
        }
        else if(err.type == "system" && err.code === "internet"){
            if(!this.internetConnectionError){
                this.internetConnectionError = Date.now()
                if(this._bot.logs.system){
                    if(this.discordSide.lancement) console.warn(`\n\x1b[33mDiscord.js: Internet connection interrupted at [${new Date(Date.now()).toUTCString()}]\x1b[37m`)
                    else console.warn(`\n\x1b[33mDiscord.js: No internet connection for log in !\x1b[37m`)
                }
            } 
            if(!this.#internetConnectionErrorWarn){
                this.#internetConnectionErrorWarn = true
                if(this._bot.logs.system) console.warn("\n\x1b[33mDiscord.js: Waiting for an internet connection ...\x1b[37m")
            }
            return setTimeout(() => {
                return this.login()
            }, 1000 * this.#internetInterval)
        }
        return err
    }

    #handleWebsocketCalls(bodyLogin){
        //setting gateaway
        this.discordSide.ws.on("open", async () => {
            setTimeout(() => {
                if(this._bot.state === "reconnect"){
                    let body = {op: 6, d: {token: this._bot.token, session_id: this.discordSide.session_id, seq: (this.discordSide.lastEvent)}}
                    this.discordSide.ws.send(JSON.stringify(body))
                }else this.discordSide.ws.send(JSON.stringify(bodyLogin))
            }, 2 * 1000)
            setTimeout(() => {
                if(!this.discordSide.lastEvent){
                    this.discordSide.ws.close()
                    this.resetDiscordSide()
                    return createError("Could not log in", {state: false, message: "Connection process failed.\n Try to check if there is any infinite loop."})
                }
            }, 30 * 1000)
        })
        
        //starting gateaway
        this.discordSide.ws.on("message", async message => {
            message = JSON.parse(Buffer.from(message).toString("utf-8"))
            if(message.s) this.discordSide.lastEvent = message.s
            switch(message.op){
                case(10):
                    this.#sendHearBeat()
                    this.discordSide.lastPing = Date.now()
                    this.discordSide.HBinterval = message.d.heartbeat_interval
                    this.discordSide.intervalState = "on"
                    this.#handleHearBeats()
                break;
                case(7):
                    if(this._bot.logs.system) console.log(`Discord.js: Reconnection asked by Discord [${new Date(Date.now()).toUTCString()}]`)
                    this.#stopWS("RECONNECT")
                break;
                case(9):
                    if(this._bot.logs.system) console.log(`Discord.js: Invalid Session response from Discord [${new Date(Date.now()).toUTCString()}]`)
                    this.#stopWS("INVALID_SESSION")
                break;
                case(0):
                    if(message.d.guild_id && !this._bot.guilds.get(message.d.guild_id)) return
                    let event = this.events.find(event => event.name === message.t)
                    if(event){
                        if(this._bot.logs.events) console.log(`Discord.js: New event received: ${message.t}`)
                        return event.execute(this._bot, message.d)
                    }
                    if(this._bot.logs.system) console.info(`\x1b[34mDiscord.js: The Discord event ${message.t} is unavailable !\x1b[37m`)
                break;
                case(1):
                    this.#sendHearBeat()
                break;
                case(11):
                    this.discordSide.lastACK = Date.now()
                break;
            }
        })
    }

    #sendHearBeat(){
        this.discordSide.ws.send(JSON.stringify({"op": 1, "d": this.discordSide.lastEvent || null}))
    }

    #handleHearBeats(){
        this.discordSide.interval = setInterval(() => {
            if((Date.now() - this.discordSide.lastACK) > (this.discordSide.HBinterval * 1.1)){
                if(this._bot.logs.system) console.log(`Discord.js: Connection lost with Discord [${new Date(Date.now()).toUTCString()}]`)
                this.#stopWS("SESSION_CONNECTION_LOST")
            }
            else{
                this.discordSide.lastPing = Date.now()
                this.#sendHearBeat()
            }
        }, this.discordSide.HBinterval)
    }

    #stopWS(event){
        let eventToExecute = this.events.find(localEvent => localEvent.name === event)
        eventToExecute.execute(this._bot)
        try {
            this.discordSide.ws.close()
        } catch{}
        this.discordSide.intervalState = null
        clearInterval(this.discordSide.interval)
        return this.login()
    }

    resetDiscordSide(){
        this.discordSide = {
            ws: null,
            commandsChecked: null,
            lastEvent: null,
            interval: null,
            lastACK: null,
            session_id: null,
            HBinterval: null,
            dvdatas: null,
            lancement: null,
            guild_ids: [],
            available_ids: [],
            intervalState: null,
            lastPing: -1,
            reconnection_url: null,
            availableEvents: this._bot.availableEvents,
            token: this._bot.token,
            lancementError: null,
            connectionInfos: {
                connectionUrl: this.discordSide.connectionInfos.connectionUrl,
                connectionNumber: this.discordSide.connectionInfos.connectionNumber,
                shardAdvised: this.discordSide.connectionInfos.shardAdvised
            }
        }
    }
}

module.exports = WebsocketHandler