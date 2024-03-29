const BaseGuild = require("./guildtext")
const threadMethod = require("../../../methods/threads")
const channelMethod = require("../../../methods/channel")
const threadmembersAdministrator = require("../../administrators/threadmembers")

class baseThread extends BaseGuild{
    constructor(channel, bot){
        super(channel, bot)
        this.owner_id = channel.owner_id
        this.member_count = channel.member_count
        this.archived = channel.thread_metadata?.archived
        this.auto_archive_duration =  channel.thread_metadata?.auto_archive_duration,
        this.archive_timestamp = channel.thread_metadata?.archive_timestamp
        this.locked = channel.thread_metadata?.locked
        this.owner = channel.owner_id && this.guild ? this.guild.members.get(channel.owner_id).user : null
        this.flags = channel.flags || 0
        this.last_message_id = channel.last_message_id || null
        this.members = new threadmembersAdministrator(this._bot, this.guild_id, this.id)
    }

    join(){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            channel_id: this.id
        }
        return threadMethod.jointhread(informations)
    }

    leave(){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: this.id
        }
        return threadMethod.leavethread(informations)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    modify(options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            id: this.id
        }
        return channelMethod.modify(informations, options)
    }

    delete(options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            id: this.id
        }
        return channelMethod.delete(informations, options)
    }
}

module.exports = baseThread