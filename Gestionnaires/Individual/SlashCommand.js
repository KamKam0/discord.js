const Base = require("./base")
class Slash extends Base{
    constructor(slash, bot){
        super(bot)
        this.id = slash.id
        this.application_id = slash.application_id
        this.version = slash.version
        this.description_localizations = slash.description_localizations || {}
        this.name_localizations = slash.name_localizations || {}
        this.dm_permission = slash.dm_permission ?? false
        this.default_member_permissions = slash.default_member_permissions ? Number(slash.default_member_permissions) : null
        this.type = slash.type || 1
        this.name = slash.name
        this.nsfw = slash.nsfw
        this.options = slash.options ? slash.options.map(opt => new (require("../../Classes/Options"))(opt)) : []
        this.description = slash.description || null
    }
}
module.exports = Slash