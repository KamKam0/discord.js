module.exports.connect = async (bot, datas) =>{
    return new Promise(async (resolve, reject) => {
        if(!datas || !bot || typeof datas !== "object") return reject(new Error("Error infos"))
        if(!bot.discordjs.ws) return reject(new Error("Error ws"))
        if(!datas.channel_id || !datas.guild_id) return reject(new Error("error ids"))
        let body = {
            "op": 4,
            "d": {
              "guild_id": datas.guild_id,
              "channel_id": datas.channel_id,
              "self_mute": false,
              "self_deaf": false
            }
        }
        bot.discordjs.ws.send(JSON.stringify(body))
        return resolve("complete")
    })
}
module.exports.disconnect = async (bot, datas) =>{
    return new Promise(async (resolve, reject) => {
        if(!datas || !bot || typeof datas !== "object") return reject(new Error("Error infos"))
        if(!bot.discordjs.ws) return reject(new Error("Error ws"))
        if(!datas.guild_id) return reject(new Error("error ids"))
        let body = {
            "op": 4,
            "d": {
              "guild_id": datas.guild_id,
              "channel_id": null
            }
        }
        bot.discordjs.ws.send(JSON.stringify(body))
        return resolve("complete")
    })
}
module.exports.manage = async (bot, guild_id) =>{
    return
    let guild = bot.guilds.get(guild_id).voice
    const ws = require("ws")
    const WebSocket = new ws("wss://" + guild.server.endpoint + "/?v=4")
    guild.ws = WebSocket
    WebSocket.on("open", async () => {
        const body = {
            "op": 0,
            "d": {
              "server_id": guild_id,
              "user_id": bot.user.id,
              "session_id": guild.channel.session_id,
              "token": guild.server.token
            }
        }
        WebSocket.send(JSON.stringify(body))
    })
    WebSocket.on("message", async message => {
        message = JSON.parse(Buffer.from(message).toString("utf-8"))
        if(message.op === 8){
            WebSocket.send(JSON.stringify({"op": 3, "d": null}))
            guild.lastPing = Date.now()
            guild.interval = setInterval(() => {
                guild.lastPing = Date.now()
                WebSocket.send(JSON.stringify({"op": 1, "d": null}))
            }, message.d.heartbeat_interval)
        }else if(message.op === 2){
            guild.ready = message.d
            const body = {
                "op": 1,
                "d": {
                    "protocol": "udp",
                    "data": {
                        "address": message.d.ip,
                        "port": message.d.port,
                        "mode": "xsalsa20_poly1305_lite"/*message.d.modes[0]*/
                    }
                }
            }
            WebSocket.send(JSON.stringify(body))

            const dgram = require('node:dgram')

            const server = dgram.createSocket("udp4")

            server.on("message", (msg, rinfo) => {
                console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
            })

            server.on('listening', () => {
                const address = server.address();
                console.log(`server listening ${address.address}:${address.port}`);
            });

            server.send()

            server.address()
  
        }else if(message.op === 4) guild.description = message.d
        else if(message.op === 5){
            //Speaking
        }else if(message.op === 6){
            //Heartbeat ACK
        }else if(message.op === 9){
            //Resumed
        }else if(message.op === 13){
            //Client disocnnected
        }
    })
}
module.exports.speaking = (bot, guild_id, state) =>{
    if(!state) state = true
    let queue = bot.queue.get(guild_id)
    let body = {
        "op": 5,
        "d": {
            "speaking": Number(`${state === true ? 5 : 0}`),
            "delay": 0,
            "ssrc": 1
        }
    }
    queue.ws.send(JSON.stringify(body))
}
module.exports.stream = stream => {
    var OpusScript = require("opusscript");

    // 48kHz sampling rate, 20ms frame duration, stereo audio (2 channels)
    var samplingRate = 48000;
    var frameDuration = 20;
    var channels = 2;

    // Optimize encoding for audio. Available applications are VOIP, AUDIO, and RESTRICTED_LOWDELAY
    var encoder = new OpusScript(samplingRate, channels, OpusScript.Application.AUDIO);

    var frameSize = samplingRate * frameDuration / 1000;

    // Get PCM data from somewhere and encode it into opus
    var pcmData = new Buffer(stream);
    var encodedPacket = encoder.encode(pcmData, frameSize);
    encoder.delete();
    return encodedPacket
}