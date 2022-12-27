const User = require("../Individual/User")
class Invite{
    constructor(invite, bot){
        this.code = invite.code
        this.guild_id = invite.guild_id
        this.channel_id = invite.channel_id
        this.channel = invite.channel ? invite.channel : null
        this.inviter_id = invite.inviter ? invite.inviter.id : null
        this.inviter = new User({...invite.inviter, token: invite.token})
        this.target_type = this.type(invite.target_type)
        this.expires_at = invite.expires_at
        this.uses = invite.uses ? invite.uses : 0
        this.type = invite.type
        this.temporary = invite.temporary ? invite.temporary : false
        this.max_uses = invite.max_uses
        this.max_age = invite.max_age
        this.created_at = invite.created_at
        this.guild = invite.guild ? invite.guild : null
        this.bot_token = invite.token
        this.vguild_id = invite.guild ? invite.guild.vguild_id : null
        this._bot = bot
    }

    type(type){
        if(isNaN(type)) return type
        else{
            const convert = {
                1: "STREAM",
                2: "EMBEDDED_APPLICATION"
            }
            return convert[type]
        }
    }

    SetInviter(inviter){
        this.inviter = inviter
        return this
    }

    SetChannel(channel){
        this.channel = channel
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }

    Modify_Datas(invite){
        let tocheck = Object.entries(invite)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "target_type"){
                    if(this[e[0]] !== this.type(e[1])) this[e[0]] = this.type(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        return this
    }

    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/guild").deleteinvite(this.bot_token, this.id, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - delete, invite")
                er.content = err
                reject(er)
            })
        })
    }
}
module.exports = Invite