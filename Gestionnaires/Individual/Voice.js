class Voice{
    constructor(voice, bot){
        this.guild = voice.guild || bot.guilds.get(voice.guild_id) || null
        this.guild_id = voice.guild_id || null
        this.bot_token = bot.discordjs.token
        this.channel_id = voice.channel_id || null
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.user_id = voice.user_id
        this.member = voice.member ? this.guild.members.get(voice.member.user_id) : null
        this.user = voice.user ? bot.users.get(voice.user.id) :  null
        this.session_id = voice.session_id
        this.deaf = voice.deaf ?? false
        this.mute = voice.mute ?? false
        this.self_deaf = voice.self_deaf ?? false
        this.self_mute = voice.self_mute ?? false
        this.self_stream = voice.self_stream ?? false
        this.self_video = voice.self_video ?? false
        this.suppress = voice.suppress ?? false
        this.request_to_speak_timestamp = voice.request_to_speak_timestamp || null
        this._bot = bot
    }

    __Modify_Datas(voice){
        let tocheck = Object.entries(voice)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }
}
module.exports = Voice