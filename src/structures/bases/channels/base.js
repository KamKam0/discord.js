const Base = require("../baseguild")
const channelTypes = require("../../../types/channels")
const channelMethod = require("../../../methods/channel")

class base extends Base{
    constructor(channel, bot){
        super(channel, bot)

        this._modifyConstants.push({name: "type", data: channelTypes.revert()})
        
        this.id = channel.id
        this.type = this._typechange(this._modifyConstants.find(e => e.name === "type").data, channel.type)
    }

    /**
     * 
     * @param {object[]} options 
     * @returns 
     */
    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return channelMethod.modify(informations, options)
    }
}

module.exports = base