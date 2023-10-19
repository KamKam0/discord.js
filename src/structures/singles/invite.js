const User = require("./user")
const Base = require("../bases/baseguild")
const guildMethod = require("../../methods/guild")
const inviteTypes = require("../../types/invite")

class Invite extends Base{
    constructor(invite, bot){
        super(invite, bot)

        this._modifyConstants.push({name: "target_type", data: inviteTypes.revert()})
        
        this.code = invite.code
        this.channel_id = invite.channel_id
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.inviter_id = invite.inviter ? invite.inviter.id : null
        this.inviter = this.inviter_id ? bot.users.get(this.inviter_id) || new User(invite.inviter, bot) : null
        this.target_type = this._typechange(this._modifyConstants.find(e => e.name === "target_type").data, invite.target_type) || null
        this.expires_at = invite.expires_at || null
        this.uses = invite.uses || 0
        this.type = invite.type || null
        this.temporary = invite.temporary ?? false
        this.max_uses = invite.max_uses || null
        this.max_age = invite.max_age || null
        this.created_at = invite.created_at || null
    }

    /**
     * 
     * @returns 
     */
    async delete(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.code
        }
        return guildMethod.deleteinvite(informations, options)
    }
}
module.exports = Invite