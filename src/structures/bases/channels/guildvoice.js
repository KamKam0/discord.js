const Base = require("./baseguild")
const Members = require("../../../structures/managers/members")
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
        if(parameters && typeof parameters === "object" ){
            if(parameters.mute && typeof parameters.mute !== "boolean") parameters.mute = false
            if(parameters.deaf && typeof parameters.deaf !== "boolean") parameters.deaf = false
            if(parameters.timeout && typeof parameters.timeout !== "number") delete parameters.timeout
        }else parameters = {}
        const {joinVoiceChannel} = require("@discordjs/voice")
        let guild = this._bot.guilds.get(this.guild_id)
        guild.voice.stop()
        guild.voice._deploy()
        guild.voice.state = true
        guild.voice.channel_id = this.id
        if(parameters.timeout) guild.voice._setDefaultTiemout(parameters.timeout)
        joinVoiceChannel({
            channelId: this.id,
            guildId: this.guild_id,
            adapterCreator: guild.voice.voiceAdapterCreator,
            selfDeaf: parameters.deaf ?? false,
            selfMute: parameters.mute ?? false
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