const BaseMember = require("../managers/members")
class Members extends BaseMember{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    /**
     * 
     * @param {string} ID 
     * @param {object} options 
     * @returns 
     */
    ban(ID, options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            user_id: ID
        }
        return require("../methods/ban").ban(informations, options)
    }

    /**
     * 
     * @param {string} ID 
     * @returns 
     */
    unban(ID){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            user_id: ID
        }
        return require("../methods/ban").unban(informations)
    }
}

module.exports = Members