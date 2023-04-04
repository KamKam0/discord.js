const guildBase = require("../../../structures/bases/baseguild")
const webhookTypes = require("../../../types/webhook")

class AuditLogEntry extends guildBase{
    constructor(auditupdate, bot){
        super(auditupdate, bot)

        this.target_id = auditupdate.target_id
        this.action_type = this._typechange(webhookTypes.revert(), auditupdate.action_type)
        this.changes = auditupdate.changes
        this.id = auditupdate.action_type
        this.options = auditupdate.options
        this.reason = auditupdate.reason

        this.user_id = auditupdate.user_id || null
        this.user = this.user_id ? bot.users.get(this.user_id) : null
    }
}
module.exports = AuditLogEntry