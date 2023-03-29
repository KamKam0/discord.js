const BaseVoice = require("../managers/voices")
class Voices extends BaseVoice{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    async muteVoice(userId){
        let information = {
            botToken: this._token,
            bot: this._bot,
            id: this.guild_id,
            user_id: userId
        }

        return guildMethod.modifyuservoice(information, this.channel_id, true)
    }

    async unmuteVoice(userId){
        let information = {
            botToken: this._token,
            bot: this._bot,
            id: this.guild_id,
            user_id: userId
        }

        return guildMethod.modifyuservoice(information, this.channel_id, false)
    }
}

module.exports = Voices