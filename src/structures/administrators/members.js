const BaseMember = require("../managers/members")
const banMethod = require("../../methods/ban")
const kickMethod = require("../../methods/kick")
const guildMethod = require("../../methods/guild")

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
        return banMethod.ban(informations, options)
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
        return banMethod.unban(informations)
    }

    kick(ID){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            user_id: ID
        }
        return kickMethod(informations)
    }

    adduserid(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            guild_id: this.guild_id,
            user_id: userid
        }
        return guildMethod.addmember(informations, options)
    }
}

module.exports = Members