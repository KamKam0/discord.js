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
    removemember(memberid){
        return new Promise((resolve, reject) => {
            require("../../../../Methods/threads").removethreadmember(this.bot_token, this.id, memberid, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    leave(){
        return new Promise((resolve, reject) => {
            require("../../../../Methods/threads").leavethread(this.bot_token, this.id, memberid, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {string} memberid 
     * @returns 
     */
    addmember(memberid){
        return new Promise((resolve, reject) => {
            require("../../../../Methods/threads").addthreadmember(this.bot_token, this.id, memberid, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    getmember(memberid, withmember, limit, after){
        return new Promise((resolve, reject) => {
            require("../../../../Methods/threads").getthreadmember(this.bot_token, this.id, memberid, withmember, limit, after, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    getmembers(withmember, limit, after){
        return new Promise((resolve, reject) => {
            require("../../../../Methods/threads").getthreadmembers(this.bot_token, this.id, withmember, limit, after, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}

module.exports = baseGuild