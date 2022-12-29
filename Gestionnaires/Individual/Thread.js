class Thread{
    constructor(thread, bot){
        this.id = thread.id
        this.guild = thread.guild || null
        this.guild_id = thread.guild_id
        this.bot_token = thread.token
        this.type = thread.type
        this.archived = thread.thread_metadata || thread.archived
        this.auto_archive_duration =  thread.thread_metadata ? thread.thread_metadata.auto_archive_duration : thread.auto_archive_duration
        this.archive_timestamp = thread.thread_metadata ? thread.thread_metadata.archive_timestamp : thread.archive_timestamp
        this.locked = thread.thread_metadata ? thread.thread_metadata.locked : thread.locked
        this.rate_limit_per_user = thread.rate_limit_per_user || 0
        this.parent_id = thread.parent_id
        this.parent = thread.parent || null
        this.owner_id = thread.owner_id
        this.owner = thread.owner || null
        this.name = thread.name
        this.last_message_id = thread.last_message_id || null
        this.flags = thread.flags || 0
        this.vguild_id = thread.guild ? thread.guild.vguild_id : null
        this._bot = bot
    }

    SetOwner(owner){
        if(owner === undefined) return this
        this.owner = owner
        return this
    }

    SetParent(parent){
        this.parent = parent
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }

    SetMemberCount(count){
        this.member_count = count
        return this
    }

    Modify_Datas(thread){
        let tocheck = Object.entries(thread)
        tocheck.forEach(e => { 
            if(e[0] === "thread_metadata"){
                let defs = Object.entries(e[1])
                defs.forEach(f => {
                    if(this[f[0]] !== f[1]) this[f[0]] = f[1] 
                })
            }
            else if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    removemember(memberid){
        return new Promise((resolve, reject) => {
            require("../../Methods/threads").removethreadmember(this.bot_token, this.id, memberid, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    leave(){
        return new Promise((resolve, reject) => {
            require("../../Methods/threads").leavethread(this.bot_token, this.id, memberid, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    addmember(memberid){
        return new Promise((resolve, reject) => {
            require("../../Methods/threads").addthreadmember(this.bot_token, this.id, memberid, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}
module.exports = Thread