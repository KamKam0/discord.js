const base = require("../../bases/base")
const { getPermissionsFromBitfields } = require("../../../utils/functions").gets
const automoderationTypes = require("../../../types/channelpermission")

class Permissions extends base{
    constructor(permissions, bot){
        super(bot)
        this.id = permissions.id
        this.type = this.#type(permissions.type)
        this.allow = permissions.allow
        this.deny = permissions.deny
        this.allowArray = getPermissionsFromBitfields(this.allow)
        this.denyArray = getPermissionsFromBitfields(this.deny)
    }

    #type(type){
        return this._typechange(automoderationTypes.revert(), type)
    }
}
module.exports = Permissions