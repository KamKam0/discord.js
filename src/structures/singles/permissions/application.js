const base = require("../../bases/base")
const applicationpermissionTypes = require("../../../types/applicationpermission")

class Permissions extends base{
    constructor(permissions, bot){
        super(bot)
        this.id = permissions.id
        this.type = this.#type(permissions.type)
        this.permission = permissions
    }

    #type(type){
        return this._typechange(applicationpermissionTypes.revert(), type)
    }
}
module.exports = Permissions