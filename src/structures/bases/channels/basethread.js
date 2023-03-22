const BaseGuild = require("./guildText")
class baseGuild extends BaseGuild{
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
    }

    /**
     * 
     * @param {string} memberid 
     * @returns 
     */
    async removeMember(memberid){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            user_id: memberid
        }
        return require("../../../../methods/threads").removethreadmember(informations)
    }

    /**
     * 
     * @returns 
     */
    async leave(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../../../methods/threads").leavethread(informations)
    }

    /**
     * 
     * @param {string} memberid 
     * @returns 
     */
    async addMember(memberid){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            user_id: memberid
        }
        return require("../../../../methods/threads").addthreadmember(informations)
    }

    async getMember(memberid, withmember, limit, after){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            user_id: memberid
        }
        return require("../../../../methods/threads").getthreadmember(informations, withmember, limit, after)
    }

    async getMembers(withmember, limit, after){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            user_id: memberid
        }
        return require("../../../../methods/threads").getthreadmembers(informations, withmember, limit, after)
    }
}

module.exports = baseGuild