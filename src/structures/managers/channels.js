const Base = require("../bases/basemultiple")
const channelTypes = require("../../types/channels")

class Channels extends Base{
    constructor(_bot){
        super(_bot)
    }

    _add(Channel){
        let textType = channelTypes.reverse()[datas.type]
        let channelClass = require(`../structures/singles/channel${textType.toLowerCase()}`)
        this.container.push(new channelClass(Channel, this._bot))
        return this
    }
}

module.exports = Channels