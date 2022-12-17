const User = require("./User")
class Ban{
    constructor(ban){
        this.user = new User({...ban.user, token: ban.token})
        this.user_id = ban.user.id
        this.reason = ban.reason ? ban.reason : null
        this.guild = ban.guild ? ban.guild : null
        this.guild_id = ban.guild_id
        this.vguild_id = ban.guild ? ban.guild.vguild_id : null
        this.bot_token = ban.token
    }

    SetUser(user){
        this.user = user
        return this
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

    unban(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/ban").unban(this.bot_token, this.guild.id, this.user.id, options)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - Ban function unban")
                er.content = err
                reject(er)
            })
        })
    }
}
module.exports = Ban