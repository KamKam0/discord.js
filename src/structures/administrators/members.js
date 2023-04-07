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
    ban(id, options){
        let member = this.get(id)
        if(!member) return Promise.reject("No member found")
        return member.ban(options)
    }

    /**
     * 
     * @param {string} ID 
     * @returns 
     */
    unban(ID, options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            user_id: ID
        }
        return banMethod.unban(informations, options)
    }

    kick(id){
        let member = this.get(id)
        if(!member) return Promise.reject("No member found")
        return member.kick(options)
    }

    add(userid){
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