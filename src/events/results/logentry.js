const guildBase = require("../../structures/bases/baseguild")
class AuditLogEntry extends guildBase{
    constructor(auditupdate, bot){
        super(auditupdate, bot)

        this.target_id = auditupdate.target_id
        this.action_type = this.#type2(auditupdate.action_type)
        this.changes = auditupdate.changes
        this.id = auditupdate.action_type
        this.options = auditupdate.options
        this.reason = auditupdate.reason

        this.user_id = auditupdate.user_id || null
        this.user = this.user_id ? bot.users.get(this.user_id) : null
    }

    #type2(type){
        return this._typechange({
            1: "Incoming",
            2: "Channel Follower",
            3: "Application"
        }, type)
    }
}
module.exports = AuditLogEntry