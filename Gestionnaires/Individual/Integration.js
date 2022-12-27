class Integration{
    constructor(int, bot){
        this.guild_id = int.guild_id
        this.id = int.id
        this.name = int.name
        this.type = int.type
        this.enabled = int.enabled ? int.enabled : null
        this.syncing = int.syncing ? int.syncing : false
        this.role_id = int.role_id
        this.role = int.role ? int.role : null        
        this.enable_emoticons = int.enable_emoticons ? enable_emoticons : false
        this.expire_behavior = this.type(int.expire_behavior)
        this.expire_grace_period = int.expire_grace_period
        this.user_id = int.user ? int.user.id : null
        this.user = int.user ? int.user : null
        this.account = int.account ? int.account : null
        this.synced_at = int.synced_at ? int.synced_at : null
        this.subscriber_count = int.subscriber_count
        this.revoked = int.revoked ? int.revoked : false
        this.guild = int.guild ? int.guild : null
        this.bot_token = int.token
        this.vguild_id = int.guild ? int.guild.vguild_id : null
        this._bot = bot
    }

    type(type){
        if(isNaN(type)) return type
        else{
            const convert = {
                0: "Remove role",
                1: "Kick"
            }
            return convert[type]
        }
    }

    SetUser(user){
        this.user = user
        return this
    }

    SetRole(role){
        this.role = role
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }

    Modify_Datas(inte){
        let tocheck = Object.entries(inte)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "expire_behavior"){
                    if(this[e[0]] !== this.type(e[1])) this[e[0]] = this.type(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        return this
    }
    

    delete(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").deleteintegration(this.bot_token, this.guild_id, this.id, this._bot)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - delete, invite")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
}
module.exports = Integration