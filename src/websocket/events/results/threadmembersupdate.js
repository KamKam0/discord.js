const guildBase = require("../../../structures/bases/baseguild")
const Thread = require("../../../structures/singles/channels/channelguildpublicthread")

class ThreadUpdate extends guildBase{
    constructor(threadupdate, bot){
        super(threadupdate, bot)
        
        this.id = threadupdate.id
        this.thread = new Thread(threadupdate.thread, bot)
        this.added_members = threadupdate.added_members
        this.removed_member = threadupdate.removed_member
        this.member_count = threadupdate.member_count
    }
}
module.exports = ThreadUpdate