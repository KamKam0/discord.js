const Base = require("../bases/basemultiple")
const threadMember = require("../singles/threadmember")

class ThreadMembers extends Base{
    constructor(_bot, guild_id, threadid){
        super(_bot, guild_id, "threadmember", 'user_id')
        this.thread_id = threadid
    }
}

module.exports = ThreadMembers