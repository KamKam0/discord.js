const User = require("../Gestionnaires/Individual/User")
class Unban{
    constructor(ban){
        this.user = new User({...ban.user, token: ban.token})
        this.user_id = ban.user.id
        this.guild = ban.guild
        this.vguild_id = null
        this.guild_id = ban.guild_id
        this.bot_token = ban.token
        this.vguild_id = null
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }

    Modify_Datas(ban){
        let tocheck = Object.entries(ban)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    Ban(options){
        return new Promise((resolve, reject) => {
            require("../Methods/ban").ban(this.bot_token, this.guild.id, this.user.id, options)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - Unban, function Ban")
                er.content = err
                reject(er)
            })
        })
    }
}
module.exports = Unban