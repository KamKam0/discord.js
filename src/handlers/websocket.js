const Initiate = require("./initiate")
const createError = require("../utils/functions").createError
const ws = require("ws")
const { getGateway } = require("../methods/me")
const { createDM } = require("../methods/user")

class WebsocketHandler{
    constructor(bot){
        this._bot = bot
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
            availableIds: [],
            intervalState: null,
            lastPing: -1,
            reconnectionUrl: null,
            token: null,
            lancementError: null,
            connectionInfos: {
                connectionUrl: null,
                connectionNumber: null,
                shardAdvised: null
            }
        }
        this.initiate = new Initiate(bot)
    }

    async #connectionURL(){
        return new Promise(async (resolve, reject) => {
            let trueurl;
            if(this._bot.state === "processing" && !this.discordSide.connectionInfos.connectionUrl){
                const basedatas = await getGateway(this._bot.token).catch(err => {})
                if(!basedatas){
                    setTimeout(() => {
                        this.#connectionURL()
                        .catch(err => reject(err))
                        .then(datas => resolve(datas))
                    }, 5 * 1000 * 60)
                }
                this.discordSide.connectionInfos = {
                    connectionUrl: `${basedatas.url}/?v=10&encoding=json`,
                    connectionNumber: basedatas.session_start_limit.remaining,
                    shardAdvised: basedatas.shards
                }
                trueurl = this.discordSide.connectionInfos.connectionUrl
            }else trueurl = this.discordSide.reconnectionUrl

            return resolve(trueurl)
        })
    }

    async #handleCreator(){
        return new Promise(async (resolve, reject) => {
            if(this._bot.state === "processing" && !this._bot.creator){
                this.discordSide.lancement = Date.now()
                let sentInformation = {
                    botToken: this._bot.token,
                    bot: this._bot
                }
                var us = await createDM(sentInformation, this._bot.config.general["ID createur"]).catch(err => {console.log(err)})
                if(!us){
                    setTimeout(() => {
                        this.#handleCreator()
                        .catch(err => reject(err))
                        .then(datas => resolve(datas))
                    }, 5 * 1000 * 60)
                }
                else this._bot._setCreator({id: us.recipients[0].id, channel_id: us.id})
            }

            return resolve(null)
        })
    }

    async login(presence){
        return new Promise(async (resolve, reject) => {
            if(this.discordSide.lancement && bot.state === "processing") return reject(createError("Cannot start the bot twice", {state: false, message: "You already started the bot once at " + new Date(this.discordSide.lancement).toDateString()}))
            if(this._bot.launchError) return reject(createError("Error with configuration", {state: false, message: this._bot.launchError}))
            
            this.#handleCreator()
            .then(() => {
                this.initiate.init()
                .then(() => {
                    console.log("reached")
                    if(this.discordSide.connectionInfos.connectionNumber === 0) return reject(createError("Could not log in", {state: false, message: "You reached the maximum of daily connection"}))
                    this.#connectionURL()
                    .then(connectionURL => {
                        const WebSocket = new ws(connectionURL)
                        if(!WebSocket) return reject(createError("Incorrect Infos"))

                        this.discordSide.ws = WebSocket
                        let bodyLogin;

                        if(this._bot.state !== "reconnect"){
                            bodyLogin = this._bot._getConnection((this._bot.presence || presence))
                            this._bot.presence = bodyLogin.d.presence
                        }

                        this.#handleWebsocketCalls(WebSocket, bodyLogin)

                        return resolve({result: this._bot, message: "Bot Launched", state: true})
                    })
                    .catch(err => {})
                })
                .catch(err => {
                    return reject(createError("Could not start", {state: false, message: "Errors are detcted in your commands.\nPlease correct them and retry."}))
                })
            })
            .catch(err => {})
        })
    }

    #handleWebsocketCalls(WebSocket, bodyLogin){
        //setting gateaway
        WebSocket.on("open", async () => {
            if(this._bot.state === "reconnect"){
                let body = {op: 6, d: {token: this._bot.token, session_id: this.discordSide.session_id, seq: (this.discordSide.lastEvent)}}
                this.discordSide.ws.send(JSON.stringify(body))
            }else this.discordSide.ws.send(JSON.stringify(bodyLogin))
            setTimeout(() => {
                if(!this.discordSide.lastEvent){
                    WebSocket.close()
                    this.resetDiscordSide()
                    return reject(createError("Could not log in", {state: false, message: "Connection process failed.\n Try to check if there is any infinite loop.\n Try to check if the intents you gave correspond to the ones in the developer portal."}))
                }
            }, 20 * 1000)
        })
        
        //starting gateaway
        WebSocket.on("message", async message => {
            message = JSON.parse(Buffer.from(message).toString("utf-8"))
            console.log(message)
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
                    this.#stopWS("RECONNECT")
                break;
                case(9):
                    this.#stopWS("INVALID_SESSION")
                break;
                case(0):
                    if(message.d.guild_id && !this._bot.guilds.get(message.d.guild_id)) return
                    if(this._bot.availableEvents.includes(message.t)) return require(`../events/${message.t}`)(this._bot, message.d)
                    console.info(`The Discord event ${message.t} is unavailable !`)
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
            if((Date.now() - this.discordSide.lastACK) > (this.discordSide.HBinterval * 1.1)) this.#stopWS("SESSION_CONNECTION_LOST")
            else{
                this.discordSide.lastPing = Date.now()
                this.discordSide.ws.send(JSON.stringify({"op": 1, "d": this.discordSide.lastEvent || null}))
            }
        }, this.discordSide.HBinterval)
    }

    #stopWS(event){
        require(`../events/${event}`)(this._bot)
        this.discordSide.ws.close()
        this.discordSide.intervalState = null
        clearInterval(this.discordSide.interval)
        this.login()
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
            availableIds: [],
            intervalState: null,
            lastPing: -1,
            reconnectionUrl: null,
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