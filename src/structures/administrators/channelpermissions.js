const BasePermissions = require("../managers/channelpermissions")
class ChannelPermissions extends BasePermissions{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }
}

module.exports = ChannelPermissions