const BaseChannel = require("../../managers/channels")
const channelMethod = require("../../../methods/channel")

class Channels extends BaseChannel{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    create(options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id || null
        }
        
        return channelMethod.create(informations, options)
    }
}

module.exports = Channels