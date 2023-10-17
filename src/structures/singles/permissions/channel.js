const base = require("../../bases/base")
const { getPermissionsFromBitfields } = require("../../../utils/functions").gets
const automoderationTypes = require("../../../types/channelpermission")

class Permissions extends base{
    constructor(permissions, bot){
        super(bot, permissions)

        this._modifyConstants.push({name: "type", data: automoderationTypes.revert()})

        this.id = permissions.id
        this.type = this._typechange(this._modifyConstants.find(e => e.name === "type").data, permissions.type)
        this.allow = permissions.allow
        this.deny = permissions.deny
        this.allowArray = getPermissionsFromBitfields(Number(this.allow))
        this.denyArray = getPermissionsFromBitfields(Number(this.deny))
    }
    
    /**
     * 
     * @param {object} overwrites 
     * @returns 
     */
    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.channel_id,
            overwrite_id: this.id
        }
        return channelMethod.editpermissions(informations, options)
    }

    /**
     * 
     * @param {object} overwrites 
     * @returns 
     */
    async delete(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.channel_id,
            overwrite_id: this.id
        }
        return channelMethod.deletepermission(informations, options)
    }
}
module.exports = Permissions