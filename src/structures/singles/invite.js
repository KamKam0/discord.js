const User = require("./user")
const Base = require("../bases/baseguild")
const guildMethod = require("../../methods/guild")
const inviteTypes = require("../../types/invite")

class Invite extends Base{
    constructor(invite, bot){
        super(invite, bot)

        this._modifyConstants.push({name: "target_type", data: inviteTypes.revert()})
        
        this.code = invite.code
        this.id = invite.id
        this.channel_id = invite.channel_id
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.inviter_id = invite.inviter ? invite.inviter.id : null
        this.inviter = bot.users.get(this.inviter_id) ?? new User(invite.inviter, bot)
        this.target_type = this._typechange(this._modifyConstants.find(e => e.name === "target_type").data, invite.target_type)
        this.expires_at = invite.expires_at
        this.uses = invite.uses || 0
        this.type = invite.type
        this.temporary = invite.temporary ?? false
        this.max_uses = invite.max_uses
        this.max_age = invite.max_age
        this.created_at = invite.created_at
    }

    /**
     * 
     * @returns 
     */
    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.code
        }
        return guildMethod.deleteinvite(informations)
    }
}
module.exports = Invite