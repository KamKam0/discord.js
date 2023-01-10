const User = require("../Individual/User")
class Invite{
    constructor(invite, bot){
        this.code = invite.code
        this.guild_id = invite.guild_id
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
        this.guild = invite.guild || bot.guilds.get(this.guild_id) || null
        this.bot_token = bot.discordjs.token
        this._bot = bot
    }

    #type(type){
        if(isNaN(type)) return type
        else{
            const convert = {
                1: "STREAM",
                2: "EMBEDDED_APPLICATION"
            }
            return convert[type]
        }
    }

    __Modify_Datas(invite){
        let tocheck = Object.entries(invite)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "target_type"){
                    if(this[e[0]] !== this.#type(e[1])) this[e[0]] = this.#type(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        return this
    }

    /**
     * 
     * @returns 
     */
    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/guild").deleteinvite(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}
module.exports = Invite