const User = require("./user")
const Base = require("../bases/baseguild")
const guildMethod = require("../../methods/guild")
const inviteTypes = require("../../types/invite")

class Invite extends Base{
    constructor(invite, bot){
        super(invite, bot)
        this.code = invite.code
        this.id = invite.id
        this.channel_id = invite.channel_id
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.inviter_id = invite.inviter ? invite.inviter.id : null
        this.inviter = bot.users.get(this.inviter_id) ?? new User(invite.inviter, bot)
        this.target_type = this.#type(invite.target_type)
        this.expires_at = invite.expires_at
        this.uses = invite.uses || 0
        this.type = invite.type
        this.temporary = invite.temporary ?? false
        this.max_uses = invite.max_uses
        this.max_age = invite.max_age
        this.created_at = invite.created_at
    }

    #type(type){
        return this._typechange(inviteTypes.revert(), type)
    }

    _Modify_Datas(invite){
        let tocheck = Object.entries(invite)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "target_type"){
                    if(this[e[0]] !== this.#type(e[1])) this[e[0]] = this.#type(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        this._modifyGetDatas()
        return this
    }

    /**
     * 
     * @returns 
     */
    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return guildMethod.deleteinvite(informations)
    }
}
module.exports = Invite