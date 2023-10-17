const BasePermissions = require("../../managers/channelpermissions")
const channelMethod = require("../../../methods/channel")

class ChannelPermissions extends BasePermissions{
    constructor(bot, guild_id, channel_id){
        super(bot, guild_id)
        this.channel_id = channel_id
        this._ignoreParameters = [
            'allowArray',
            'denyArray'
        ]
    }

    /**
     * 
     * @param {object} overwrites 
     * @returns 
     */
    async modify(id, overwrites){
        let overwrite = this.get(id)
        if(!overwrite) return Promise.reject("No permission overwrite found")
        return overwrite.modify(overwrites)
    }

    /**
     * 
     * @param {object} overwrites 
     * @returns 
     */
    async delete(id){
        let overwrite = this.get(id)
        if(!overwrite) return Promise.reject("No permission overwrite found")
        return overwrite.delete()
    }
}

module.exports = ChannelPermissions