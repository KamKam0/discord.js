module.exports.login = async (bot, presence) => {
    return new Promise(async (resolve, reject) => {
        //check and constants
        if(!bot.name || bot.name === null || bot.name === '00#404e') return reject(new Error("No bot name or invalid"))
        if(bot.state === "processing"){
            bot.discordjs.lancement = Date.now()
            var us = await require("./Methods/user").createDM(bot.discordjs.token, bot.config.general["ID createur"], bot).catch(err => {console.log(err)})
            if(!us){
                setTimeout(() => this.login(bot, (bot.presence || presence)), 5 * 1000 * 60)
                return
            }else bot.setCreator({id: us.recipients[0].id, channel_id: us.id})
        }

        //checking constants
        let checked = bot.Initiate()
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
                
            bot.SendMessage(bot.creator.channel_id, {embeds: [erembed]})
            .then(() => process.exit())
            .catch(err => {})
            return
        }
        bot.CheckCommands()

        //constants connecting gateaway
        const fetch = require("node-fetch")
        let baseinfos = require("./Utils/functions").getbaseinfosre(bot.discordjs.token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        
        //settings gateaway
        if(bot.state !== "reconnect"){
            const url = `${baseurl}/gateway/bot`
            const basedatas = await fetch(url, {headers: baseheaders, method: "GET"}).catch(err => {})
            if(!basedatas){
                setTimeout(() => this.login(bot, (bot.presence || presence)), 5 * 1000 * 60)
                return
            }
            const datas = await basedatas.json()
            var trueurl = `${datas.url}/?v=10&encoding=json`
        }

        if(bot.state === "reconnect") var trueurl = bot.discordjs.reconnection_url
        
        const ws = require("ws")

        //connecting gateaway
        const WebSocket = new ws(trueurl)
        if(!WebSocket) return reject(new Error("Incorrect Infos"))
        bot.discordjs.ws = WebSocket
        
        if(bot.state !== "reconnect"){
            var body_login = body = bot.get_connection((bot.presence || presence))
            bot.presence = body_login.d.presence
        }

        //setting gateaway
        WebSocket.on("open", async () => {
            if(bot.state === "reconnect"){
                let body = {op: 6, d: {token: bot.discordjs.token, session_id: bot.discordjs.old_session, seq: (bot.discordjs.old_event - 1)}}
                bot.discordjs.ws.send(JSON.stringify(body))
            }else bot.discordjs.ws.send(JSON.stringify(body_login))
            setTimeout(() => {
                if(!bot.discordjs.lastEvent){
                    console.log("Le processus de connexion n'a pas pu aboutir")
                    console.log("Pensez à vérifier qu'il n'est pas de boucle infinie")
                    console.log("Pensez à vérifier les intents rentrés dans le bot")
                    console.log("Pensez à vérifier les intents sur le portail développeur de Discord")
                    process.exit()
                }
            }, 20 * 1000)
        })
        
        //starting gateaway
        WebSocket.on("message", async message => {
            message = JSON.parse(Buffer.from(message).toString("utf-8"))
            if(message.s) bot.discordjs.lastEvent = message.s
            if(message.op === 10){
                bot.discordjs.ws.send(JSON.stringify({"op": 1, "d": null}))
                bot.discordjs.lastPing = Date.now()
                bot.discordjs.HBinterval = message.d.heartbeat_interval
                if(bot.discordjs.interval_state === "on") bot.state = "isession"
                bot.discordjs.interval_state = "on"
                bot.discordjs.interval = setInterval(() => {
                    if((Date.now() - bot.discordjs.lastACK) > (bot.discordjs.HBinterval * 1.1)){
                        console.log(`Warning Session: connection lost with gateaway at ${new Date(Date.now()).toLocaleString("fr")}`)
                        bot.discordjs.interval_state = null
                        clearInterval(bot.discordjs.interval)
                        bot.discordjs.ws.close()
                        bot.discordjs.old_session = bot.discordjs.session_id
                        bot.discordjs.old_event = bot.discordjs.lastEvent
                        bot.state = "isession"
                        setTimeout(() => this.login(bot, (bot.presence || presence)), 5000)
                    }else{
                        bot.discordjs.lastPing = Date.now()
                        bot.discordjs.ws.send(JSON.stringify({"op": 1, "d": bot.discordjs.lastEvent}))
                    }
                }, bot.discordjs.HBinterval)
            }
            else if(message.op === 7){
                console.log(`Warning Session: reconnection asked at ${new Date(Date.now()).toLocaleString("fr")}`)
                bot.discordjs.ws.close()
                bot.discordjs.interval_state = null
                clearInterval(bot.discordjs.interval)
                bot.discordjs.old_session = bot.discordjs.session_id
                bot.discordjs.old_event = bot.discordjs.lastEvent
                bot.state = "reconnect"
                setTimeout(() => this.login(bot, (bot.presence || presence)), 5000)
            }
            else if(message.op === 0){
                if(!["GUILD_CREATE", "READY", "USER_UPDATE", "MESSAGE_CREATE", "INTERACTION_CREATE", "MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(message.t)) if(!bot.guilds.get(message.d.guild_id)) return
                if(["MESSAGE_CREATE", "INTERACTION_CREATE", "MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE", "MESSAGE_DELETE", "MESSAGE_UPDATE"].includes(message.t) && message.d.guild_id && !bot.guilds.get(message.d.guild_id)) return
                require(`./Events/${message.t}.js`)(bot, message.d)
            } 
            else if(message.op === 9){
                console.log(`Warning Session: invalid session at ${new Date(Date.now()).toLocaleString("fr")}`)
                require("./Events/INVALID_SESSION")(bot)
                bot.discordjs.ws.close()
                bot.discordjs.interval_state = null
                clearInterval(bot.discordjs.interval)
                bot.state = "isession"
                setTimeout(() => this.login(bot, (bot.presence || presence)), 5000)
            }
            else if(message.op === 1) bot.discordjs.ws.send(JSON.stringify({"op": 1, "d": null}))
            else if(message.op === 11) bot.discordjs.lastACK = Date.now()
        })
        return resolve({result: bot, message: "Bot Launched"})
    })
}