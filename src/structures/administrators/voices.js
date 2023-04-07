const BaseVoice = require("../managers/voices")
class Voices extends BaseVoice{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    async muteVoice(userId){
        let voice = this.get(userId)
        if(!voice) return Promise.reject("No voice found")
        return voice.muteVoice(overwrites)
    }

    async unmuteVoice(userId){
        let voice = this.get(userId)
        if(!voice) return Promise.reject("No voice found")
        return voice.unmuteVoice(overwrites)
    }
}

module.exports = Voices