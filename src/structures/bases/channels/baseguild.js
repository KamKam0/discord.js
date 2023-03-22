const Base = require("./base")
class baseGuild extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.position = channel.position
        this.permission_overwrites = channel.permission_overwrites
        this.name = channel.name
        this.nsfw = channel.nsfw ?? false
        this.parent_id = channel.parent_id || null
        this.parent = this.parent_id ? bot.channels.get(this.parent_id) : null
    }

    /**
     * 
     * @returns 
     */
    async getInvites(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../../../methods/channel").getinvites(informations)
    }

    /**
     * 
     * @returns 
     */
    async createInvite(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../../../methods/channel").createinvite(informations)
    }

    /**
     * 
     * @param {object} overwrites 
     * @returns 
     */
    async editPermissions(overwrites){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../../../methods/channel").editpermissions(informations, overwrites)
    }

    /**
     * 
     * @param {object} overwrites 
     * @returns 
     */
    async deletePermissions(overwrites){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../../../methods/channel").deletepermission(informations, overwrites)
    }
}

module.exports = baseGuild