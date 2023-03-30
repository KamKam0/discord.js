const BasePermissions = require("../managers/channelpermissions")
const channelMethod = require("../../methods/channel")

class ChannelPermissions extends BasePermissions{
    constructor(bot, guild_id, channel_id){
        super(bot, guild_id)
        this.channel_id = channel_id
    }

    /**
     * 
     * @param {object} overwrites 
     * @returns 
     */
    async edit(id, overwrites){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.channel_id,
            overwrite_id: id
        }
        return channelMethod.editpermissions(informations, overwrites)
    }

    /**
     * 
     * @param {object} overwrites 
     * @returns 
     */
    async delete(id){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.channel_id,
            overwrite_id: id
        }
        return channelMethod.deletepermission(informations, overwrites)
    }
}

module.exports = ChannelPermissions