const Base = require("../../bases/channels/base")
const channelMethod = require("../../../methods/channel")

class Channel extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.position = channel.position
        this.permission_overwrites = channel.permission_overwrites
        this.name = channel.name
        this.nsfw = channel.nsfw ?? false
    }
    
    /**
     * 
     * @param {object[]} options 
     * @returns 
     */
    async edit(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return channelMethod.modify(informations, options)
    }
}
module.exports = Channel