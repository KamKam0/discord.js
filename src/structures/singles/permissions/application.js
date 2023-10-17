const base = require("../../bases/base")
const applicationpermissionTypes = require("../../../types/applicationpermission")

class Permissions extends base{
    constructor(permissions, bot){
        super(bot, permissions)

        this._modifyConstants.push({name: "type", data: applicationpermissionTypes.revert()})

        this.id = permissions.id
        this.type = this._typechange(this._modifyConstants.find(e => e.name === "type").data, permissions.type)
        this.permission = permissions
    }
}
module.exports = Permissions