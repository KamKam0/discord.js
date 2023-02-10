module.exports.login = async (bot, presence) => {
    return new Promise(async (resolve, reject) => {
        const createError = require("./Utils/functions").createError
        if(bot.discordjs.lancement && bot.state === "processing") return reject(createError("Cannot start the bot twice", {state: false, message: "You already started the bot once at " + new Date(bot.discordjs.lancement).toDateString()}))
        if(bot.discordjs.lancementError) return reject(createError("Error with configuration", {state: false, message: bot.discordjs.lancementError}))
        //check and constants
        if(!bot.name || bot.name === null || bot.name === '00#404e') return reject(createError("No bot name or invalid"))
        if(bot.state === "processing" && !bot.creator){
            bot.discordjs.lancement = Date.now()
            var us = await require("./Methods/user").createDM(bot.discordjs.token, bot.config.general["ID createur"], bot).catch(err => {})
            if(!us) return setTimeout(() => this.login(bot, (bot.presence || presence)), 5 * 1000 * 60)
            else bot.__setCreator({id: us.recipients[0].id, channel_id: us.id})
        }

        //checking constants
        let checked = bot.__Initiate()
        if(!checked.status){
            let erembed = new (require("./Classes/Embed"))()
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
                
            return bot.SendMessage(bot.creator.channel_id, {embeds: [erembed]}) .catch(err => {})
        }
        bot.CheckCommands()

        if(!bot.discordjs.commandsChecked) return reject(createError("Could not start", {state: false, message: "Errors are detcted in your commands.\nPlease correct them and retry."}))
        //constants connecting gateaway
        const fetch = require("node-fetch")
        let baseinfos = require("./Utils/functions").getbaseinfosre(bot.discordjs.token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        
        //settings gateaway
        if(bot.state === "processing" && !bot.discordjs.connectionInfos.connection_url){
            const url = `${baseurl}/gateway/bot`
            const basedatas = await fetch(url, {headers: baseheaders, method: "GET"}).catch(err => {})
            if(!basedatas){
                setTimeout(() => this.login(bot, (bot.presence || presence)), 5 * 1000 * 60)
                return
            }
            const datas = await basedatas.json()
            bot.discordjs.connectionInfos = {
                connection_url: `${datas.url}/?v=10&encoding=json`,
                connection_number: datas.session_start_limit.remaining,
                shard_advised: datas.shards
            }
            var trueurl = bot.discordjs.connectionInfos.connection_url
        }else var trueurl = bot.discordjs.reconnection_url

        if(bot.discordjs.connectionInfos.connection_number === 0) return reject(createError("Could not log in", {state: false, message: "You reached the maximum of daily connection"}))
        
        const ws = require("ws")

        //connecting gateaway
        const WebSocket = new ws(trueurl)
        if(!WebSocket) return reject(createError("Incorrect Infos"))
        bot.discordjs.ws = WebSocket
        
        if(bot.state !== "reconnect"){
            var body_login = body = bot.__get_connection((bot.presence || presence))
            bot.presence = body_login.d.presence
        }

        //setting gateaway
        WebSocket.on("open", async () => {
            if(bot.state === "reconnect"){
                let body = {op: 6, d: {token: bot.discordjs.token, session_id: bot.discordjs.session_id, seq: (bot.discordjs.lastEvent)}}
                bot.discordjs.ws.send(JSON.stringify(body))
            }else bot.discordjs.ws.send(JSON.stringify(body_login))
            setTimeout(() => {
                if(!bot.discordjs.lastEvent){
                    WebSocket.close()
                    bot.__resetDjs()
                    return reject(createError("Could not log in", {state: false, message: "Connection process failed.\n Try to check if there is any infinite loop.\n Try to check if the intents you gave correspond to the ones in the developer portal."}))
                }
            }, 20 * 1000)
        })
        
        let stopFunction = stop.bind(this)
        
        //starting gateaway
        WebSocket.on("message", async message => {
            message = JSON.parse(Buffer.from(message).toString("utf-8"))
            if(message.s) bot.discordjs.lastEvent = message.s
            if(message.op === 10){
                sendHeartBeat(bot)
                bot.discordjs.lastPing = Date.now()
                bot.discordjs.HBinterval = message.d.heartbeat_interval
                bot.discordjs.interval_state = "on"
                handleHeartbeats(bot, message, stopFunction)
            }
            else if(message.op === 7) stopFunction(bot, message)
            else if(message.op === 0){
                if(!["GUILD_CREATE", "READY", "USER_UPDATE", "MESSAGE_CREATE", "INTERACTION_CREATE", "MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(message.t) && !bot.guilds.get(message.d.guild_id)) return
                if(["MESSAGE_CREATE", "INTERACTION_CREATE", "MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE", "MESSAGE_DELETE", "MESSAGE_UPDATE"].includes(message.t) && message.d.guild_id && !bot.guilds.get(message.d.guild_id)) return
                if(bot.discordjs.availableEvents.includes(message.t)) require(`./Events/${message.t}.js`)(bot, message.d)
                else console.info(`The Discord event ${message.t} is unavailable !`)
            } 
            else if(message.op === 9){
                require("./Events/INVALID_SESSION")(bot)
                stopFunction(bot, message)
            }
            else if(message.op === 1) sendHeartBeat(bot)
            else if(message.op === 11) bot.discordjs.lastACK = Date.now()
        })
        return resolve({result: bot, message: "Bot Launched", state: true})
    })
}

function stop(bot, message){
    if(message.op === 7 || (message.op === 9 && message.d)) bot.state = "reconnect"
    else bot.state = "isession"
    bot.discordjs.ws.close()
    bot.discordjs.interval_state = null
    clearInterval(bot.discordjs.interval)
    this.login(bot, (bot.presence || presence))
}

function handleHeartbeats(bot, message, stopFunction){
    bot.discordjs.interval = setInterval(() => {
        if((Date.now() - bot.discordjs.lastACK) > (bot.discordjs.HBinterval * 1.1)) stopFunction(bot, message)
        else{
            bot.discordjs.lastPing = Date.now()
            bot.discordjs.ws.send(JSON.stringify({"op": 1, "d": bot.discordjs.lastEvent}))
        }
    }, bot.discordjs.HBinterval)
}

function sendHeartBeat(bot){
    bot.discordjs.ws.send(JSON.stringify({"op": 1, "d": bot.discordjs.lastEvent || null}))
}