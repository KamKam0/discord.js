const BaseGuild = require("../bases/baseguild")

class Voice extends BaseGuild{
    constructor(voice, bot){
        super(voice, bot)
        this.channel_id = voice.channel_id || null
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.user_id = voice.user_id
        this.member = this.guild.members.get(voice.user_id) || null
        this.user = bot.users.get(voice.user_id) || null
        this.session_id = voice.session_id
        this.deaf = voice.deaf ?? false
        this.mute = voice.mute ?? false
        this.self_deaf = voice.self_deaf ?? false
        this.self_mute = voice.self_mute ?? false
        this.self_stream = voice.self_stream ?? false
        this.self_video = voice.self_video ?? false
        this.suppress = voice.suppress ?? false
        this.request_to_speak_timestamp = voice.request_to_speak_timestamp || null
    }

    _Modify_Datas(voice){
        let tocheck = Object.entries(voice)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        this._modifyGetDatas()
        return this
    }

    async moveto(voiceId){

    }

    async disconnect(){
        
    }
}
module.exports = Voice