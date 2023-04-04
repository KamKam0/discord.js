const Base = require("../bases/baseguild")
const threadMethod = require("../../methods/threads")

class ThreadMember extends Base{
    constructor(threadmember, bot){
        super(bot)
        this.thread_id = threadmember.id || null
        this.thread = this.thread_id ? this.guild.threads.get(this.thread_id) : null
        this.user_id = threadmember.user_id || null
        this.user = this.user_id ? this._bot.users.get(this.user_id) : null
        this.member_id = threadmember.member_id || null
        this.member = this.member_id ? this.guild.members.get(this.member_id) : null
        this.join_timestamp = threadmember.join_timestamp
        this.flags = threadmember.flags
    }
    
    async add(){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: this.thread_id,
            user_id: this.user_id
        }
        return threadMethod.addthreadmember(informations)
    }
    
    async remove(){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: this.id,
            user_id: this.user_id
        }
        return threadMethod.removethreadmember(informations)
    }
}
module.exports = ThreadMember