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
     * 
     * @param {boolean} deaf 
     * @param {boolean} mute 
     */
    join(deaf, mute){
        const {joinVoiceChannel} = require("@discordjs/voice")
        let guild = this._bot.guilds.get(this.guild_id)
        guild.voice.stop()
        guild.voice.__deploy()
        guild.voice.state = true
        guild.voice.channel_id = this.id
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
        if(guild.voice.state) guild.voice.stop()
    }
}

module.exports = guildVoice