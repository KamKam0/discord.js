module.exports.login = async (bot, presence) => {
    return new Promise(async (resolve, reject) => {
        const createError = require("./Utils/functions").createError
        if(bot.discordjs.lancement && bot.state === "processing") return reject(createError("Cannot start the bot twice", {state: false, message: "You already started the bot once at " + new Date(bot.discordjs.lancement).toDateString()}))
        if(bot.discordjs.lancementError) return reject(createError("Error with configuration", {state: false, message: bot.discordjs.lancementError}))
        //check and constants
        if(!bot.name || bot.name === null || bot.name === '00#404e') return reject(createError("No bot name or invalid"))
        if(bot.state === "processing" && !bot.creator){
            bot.discordjs.lancement = Date.now()
            var us = await require("./methods/user").createDM(bot.discordjs.token, bot.config.general["ID createur"], bot).catch(err => {})
            if(!us) return setTimeout(() => this.login(bot, (bot.presence || presence)), 5 * 1000 * 60)
            else bot._setCreator({id: us.recipients[0].id, channel_id: us.id})
        }

        //checking constants
        let checked = bot._Initiate()
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
        bot.checkCommands()

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
            var body_login = body = bot._get_connection((bot.presence || presence))
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
                    bot._resetDjs()
                    return reject(createError("Could not log in", {state: false, message: "Connection process failed.\n Try to check if there is any infinite loop.\n Try to check if the intents you gave correspond to the ones in the developer portal."}))
                }
            }, 20 * 1000)
        })
        
        let stopFunction = stop.bind(this)
        
        //starting gateaway
        WebSocket.on("message", async message => {
            message = JSON.parse(Buffer.from(message).toString("utf-8"))
            if(message.s) bot.discordjs.lastEvent = message.s
            switch(message.op){
                case(10):
                    sendHeartBeat(bot)
                    bot.discordjs.lastPing = Date.now()
                    bot.discordjs.HBinterval = message.d.heartbeat_interval
                    bot.discordjs.interval_state = "on"
                    handleHeartbeats(bot, stopFunction)
                break;
                case(7):
                    stopFunction(bot, "RECONNECT")
                break;
                case(9):
                    stopFunction(bot, "INVALID_SESSION")
                break;
                case(0):
                    if(message.d.guild_id && !bot.guilds.get(message.d.guild_id)) return
                    if(bot.discordjs.availableEvents.includes(message.t)) return require(`./Events/${message.t}.js`)(bot, message.d)
                    console.info(`The Discord event ${message.t} is unavailable !`)
                break;
                case(1):
                    sendHeartBeat(bot)
                break;
                case(11):
                    bot.discordjs.lastACK = Date.now()
                break;
            }
        })
        return resolve({result: bot, message: "Bot Launched", state: true})
    })
}

function stop(bot, event){
    require(`./Events/${event}`)(bot)
    bot.discordjs.ws.close()
    bot.discordjs.interval_state = null
    clearInterval(bot.discordjs.interval)
    this.login(bot, (bot.presence || presence))
}

function handleHeartbeats(bot, stopFunction){
    bot.discordjs.interval = setInterval(() => {
        if((Date.now() - bot.discordjs.lastACK) > (bot.discordjs.HBinterval * 1.1)) stopFunction(bot, "SESSION_CONNECTION_LOST")
        else{
            bot.discordjs.lastPing = Date.now()
            bot.discordjs.ws.send(JSON.stringify({"op": 1, "d": bot.discordjs.lastEvent}))
        }
    }, bot.discordjs.HBinterval)
}

function sendHeartBeat(bot){
    bot.discordjs.ws.send(JSON.stringify({"op": 1, "d": bot.discordjs.lastEvent || null}))
}