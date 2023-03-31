const BaseInvites = require("../managers/invites")
const channelMethod = require("../../methods/channel")

class ChannelInvites extends BaseInvites{
    constructor(bot, guild_id, channel_id){
        super(bot, guild_id)
        this.channel_id = channel_id
    }

    async create(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.channel_id
        }
        return channelMethod.createinvite(informations)
    }

    async fetchAll(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.channel_id
        }
        return channelMethod.getinvites(informations)
    }

    async fetch(id){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id
        }
        return channelMethod.getinvite(informations)
    }

    async delete(id){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id
        }
        return channelMethod.deleteinvite(informations)
    }
}

module.exports = ChannelInvites