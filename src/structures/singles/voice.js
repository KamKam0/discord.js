const BaseGuild = require("../bases/baseguild")
const guildMethod = require("../../methods/guild")

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

    async muteVoice(){
        let information = {
            botToken: this._token,
            bot: this._bot,
            id: this.guild_id,
            user_id: this.user_id
        }

        return guildMethod.modifyuservoice(information, this.channel_id, true)
    }

    async unmuteVoice(){
        let information = {
            botToken: this._token,
            bot: this._bot,
            id: this.guild_id,
            user_id: this.user_id
        }

        return guildMethod.modifyuservoice(information, this.channel_id, false)
    }
}
module.exports = Voice