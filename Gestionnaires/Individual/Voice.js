class Voice{
    constructor(voice, bot){
        this.guild = voice.guild || null
        this.guild_id = voice.guild_id
        this.bot_token = voice.token
        this.channel_id = voice.channel_id
        this.channel = voice.channel || null
        this.user_id = voice.user_id
        this.member = voice.member || null
        this.user = voice.user || null
        this.session_id = voice.session_id
        this.deaf = voice.deaf ?? false
        this.mute = voice.mute ?? false
        this.self_deaf = voice.self_deaf ?? false
        this.self_mute = voice.self_mute ?? false
        this.self_stream = voice.self_stream ?? false
        this.self_video = voice.self_video ?? false
        this.suppress = voice.suppress ?? false
        this.request_to_speak_timestamp = voice.request_to_speak_timestamp || null
        this.vguild_id = voice.guild ? voice.guild.vguild_id : null
        this._bot = bot
    }

    SetUser(user){
        this.user = user
        return this
    }

    SetMember(member){
        this.member = member
        return this
    }

    SetChannel(channel){
        this.channel = channel
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }

    Modify_Datas(voice){
        let tocheck = Object.entries(voice)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }
}
module.exports = Voice