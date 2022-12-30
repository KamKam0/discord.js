const Base = require("./baseGuild")
class guildVoice extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.bitrate = channel.bitrate
        this.user_limit = channel.user_limit
        this.rtc_region = channel.rtc_region
    }

    join(deaf, mute){
        const {joinVoiceChannel} = require("@discordjs/voice")
        let guild = this._bot.guilds.get(this.guild_id)
        guild.ResetVoice()
        guild.voice.state = "on"
        joinVoiceChannel({
            channelId: this.id,
            guildId: this.guild_id,
            adapterCreator: guild.voiceAdapterCreator,
            selfDeaf: deaf ?? false,
            selfMute: mute ?? false
        })
    }

    leave(){
        const {getVoiceConnection} = require("@discordjs/voice")
        let guild = this._bot.guilds.get(this.guild_id)
        if(guild.voice.state === "on") getVoiceConnection(guild.id).disconnect()
        if(guild.voice.state === "on") guild.ResetVoice()
    }
}

module.exports = guildVoice