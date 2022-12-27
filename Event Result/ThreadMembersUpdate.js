class ThreadUpdate{
    constructor(threadupdate, bot){
        this.id = threadupdate.id
        this.thread = threadupdate.thread
        this.guild = threadupdate.guild
        this.guild_id = threadupdate.guild_id
        this.bot_token = threadupdate.token
        this.added_members = threadupdate.added_members
        this.removed_member = threadupdate.removed_member
        this.member_count = threadupdate.member_count
        this.vguild_id = null
        this._bot = bot
    }

    SetThread(thread){
        this.thread = thread
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }
}
module.exports = ThreadUpdate