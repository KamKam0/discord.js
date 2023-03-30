const Base = require("./base")
const overWriteAdministrator = require("../../administrators/channelpermissions")
const inviteAdministrator = require("../../administrators/channelinvites")
const channelMethod = require("../../../methods/channel")

class baseGuild extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.position = channel.position
        this.permission_overwrites = new overWriteAdministrator(bot, this.guild_id, this.id)
        this.invites = new inviteAdministrator(bot, this.guild_id, this.id)
        if(channel.permission_overwrites) this.permission_overwrites._addMultiple(channel.permission_overwrites)
        this.name = channel.name
        this.nsfw = channel.nsfw ?? false
        this.parent_id = channel.parent_id || null
        this.parent = this.parent_id ? bot.channels.get(this.parent_id) : null
    }

    /**
     * 
     * @param {object[]} options 
     * @returns 
     */
    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return channelMethod.delete(informations)
    }
}

module.exports = baseGuild