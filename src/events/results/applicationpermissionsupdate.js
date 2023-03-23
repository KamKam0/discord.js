const guildBase = require("../../structures/bases/baseguild")
class ApplicationPermissionsUpdate extends guildBase{
    constructor(permissions, bot){
        super(permissions, bot)

        this.id = permissions.id
        this.permissions = permissions.permissions
    }
}
module.exports = ApplicationPermissionsUpdate