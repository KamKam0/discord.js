const Base = require("../bases/basemultiple")
const channelTypes = require("../../types/channels")

class Channels extends Base{
    constructor(_bot){
        super(_bot)
    }

    _add(data){
        let textType = channelTypes.revert()[data.type]
        let channelClass = require(`../singles/channels/channel${textType.toLowerCase()}`)
        this.container.push(new channelClass(data, this._bot))
        return this
    }
}

module.exports = Channels