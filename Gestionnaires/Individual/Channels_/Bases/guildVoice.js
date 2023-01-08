const Base = require("./baseGuild")
class guildVoice extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.bitrate = channel.bitrate
        this.user_limit = channel.user_limit
        this.rtc_region = channel.rtc_region
    }

    /**
     * 
     * @param {boolean} deaf 
     * @param {boolean} mute 
     */
    join(deaf, mute){
        const {joinVoiceChannel} = require("@discordjs/voice")
        let guild = this._bot.guilds.get(this.guild_id)
        guild.voice.reset()
        guild.voice.state = true
        joinVoiceChannel({
            channelId: this.id,
            guildId: this.guild_id,
            adapterCreator: guild.voice.voiceAdapterCreator,
            selfDeaf: deaf ?? false,
            selfMute: mute ?? false
        })
    }

    leave(){
        const {getVoiceConnection} = require("@discordjs/voice")
        let guild = this._bot.guilds.get(this.guild_id)
        if(guild.voice.state) getVoiceConnection(this.guild_id).disconnect()
        if(guild.voice.state) guild.voice.reset()
    }
}

module.exports = guildVoice