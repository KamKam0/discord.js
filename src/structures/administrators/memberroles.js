const BaseRole = require("../managers/roles")
const roleMethod = require("../../methods/role")

class MemberRoles extends BaseRole{
    constructor(bot, guild_id, user_id){
        super(bot, guild_id)
        this.user_id = user_id
    }

    /**
     * 
     * @param {string} ID 
     * @returns 
     */
    has(ID){
        if(this.get(ID)) return true
        return false
    }

    /**
     * 
     * @param {string} roleId 
     * @returns 
     */
    async add(roleId, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            guild_id: this.guild_id,
            id: roleId
        }
        return roleMethod.add(informations, options)
    }

    /**
     * 
     * @param {string} roleId 
     * @returns 
     */
    async remove(roleId, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            guild_id: this.guild_id,
            id: roleId
        }
        return roleMethod.remove(informations, options)
    }
}

module.exports = MemberRoles