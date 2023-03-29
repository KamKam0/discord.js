const Base = require("../bases/basemultiple")
const channelTypes = require("../../types/channels")

class Threads extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    _add(data){
        let textType = channelTypes.revert()[data.type]
        let channelClass = require(`../singles/channels/channel${textType.toLowerCase()}`)
        this.container.push(new channelClass(data, this._bot))
        return this
    }
}

module.exports = Threads