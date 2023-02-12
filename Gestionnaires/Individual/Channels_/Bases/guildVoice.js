const Base = require("./baseGuild")
const Members = require("../../../Multiple/Members")
class guildVoice extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.bitrate = channel.bitrate
        this.user_limit = channel.user_limit
        this.rtc_region = channel.rtc_region
        this.members = (new Members(this._bot, this.guild_id))
    }

    /**
     * @param {object} parameters
     * @param {boolean} [parameters.mute]
     * @param {boolean} [parameters.deaf]
     * @param {number} [parameters.timeout]
     */
    join(parameters={}){
        console.log("début")
        console.log(0)
        if(parameters && typeof parameters === "object" ){
            if(parameters.mute && typeof parameters.mute !== "boolean") parameters.mute = false
            if(parameters.deaf && typeof parameters.deaf !== "boolean") parameters.deaf = false
            if(parameters.timeout && typeof parameters.timeout !== "number") delete parameters.timeout
        }else parameters = {}
        console.log(0)
        const {joinVoiceChannel} = require("@discordjs/voice")
        let guild = this._bot.guilds.get(this.guild_id)
        console.log(0)
        guild.voice.stop()
        console.log(0)
        guild.voice.__deploy()
        console.log(0)
        guild.voice.state = true
        console.log(0)
        guild.voice.channel_id = this.id
        console.log(0)
        if(parameters.timeout) guild.voice.__setDefaultTiemout(parameters.timeout)
        console.log(0)
        let co = joinVoiceChannel({
            channelId: this.id,
            guildId: this.guild_id,
            adapterCreator: guild.voice.voiceAdapterCreator,
            selfDeaf: parameters.deaf ?? false,
            selfMute: parameters.mute ?? false
        })
        console.log(0)
        console.log("fin")
        console.log(co.rejoinAttempts)
        co.on("error", e => {
            console.log("begin error")
            console.log(e)
            console.log("end error")
        })
        co.on("debug", e => {
            console.log("begin debug")
            console.log(e)
            console.log("end debug")
        })
        co.on("stateChange", e => {
            console.log("begin stateChange")
            console.log(e)
            console.log("end stateChange")
        })
    }

    leave(){
        const {getVoiceConnection} = require("@discordjs/voice")
        let guild = this._bot.guilds.get(this.guild_id)
        if(guild.voice.state) getVoiceConnection(this.guild_id).disconnect()
        if(guild.voice.state) guild.voice.stop()
    }
}

module.exports = guildVoice