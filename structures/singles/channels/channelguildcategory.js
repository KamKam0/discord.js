const Base = require("../../bases/channels/base")
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
        return require("../../../../methods/channel").modify(informations, options)
    }
}
module.exports = Channel