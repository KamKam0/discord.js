class User{
    constructor(user, bot){
        this.id = user.id
        this.username = user.username
        this.discriminator = user.discriminator
        this.avatar = user.avatar
        this.bot = user.bot ?? false
        this.system = user.system || null
        this.mfa_enabled = user.mfa_enabled || false
        this.banner = user.banner || null
        this.accent_color = user.accent_color || null
        this.locale = user.locale
        this.verified = user.verified ?? false
        this.email = user.email || null
        this.flags = user.flags || 0
        this.premium_type = user.premium_type || null
        this.public_flags = user.public_flags || null
        this.dm = null
        this.guilds = user.guild_id ? [user.guild_id] : []
        this.bot_token = user.token
        this._bot = bot
    }

    Modify_Datas(user){
        let tocheck = Object.entries(user)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    SetDM(dm){
        this.dm = dm
        return this
    }

    send(options){
        return new Promise(async (resolve, reject) => {
            if(this.dm){
                require("../../Methods/message").send(this.bot_token, this.dm, options, undefined, undefined, this._bot)
                .then(da => { return resolve(da)})
                .catch(err => reject(err))
            }else{
                require("../../Methods/user").createDM(this.bot_token, this.id, this._bot)
                .then(datas => { 
                    if(datas){
                        this.dm = datas.id
                        require("../../Methods/message").send(this.bot_token, this.dm, options, undefined, undefined, this._bot)
                        .then(da => { return resolve(da)})
                        .catch(err => reject(err))
                    }
                })
                .catch(err => reject(err))
            }
        })
    }

    compareuser(user){
        let tocheck = Object.entries(user)
        let errors = []
        tocheck.forEach(e => { 
            if(this[e[0]] !== e[1]) errors.push(e[0])
        })
        if(errors[0]) return {state: false, errors: errors}
        else return {state: true, errors: null}
    }

    displayPublicFlags(){
        if(this.public_flags === 0) return []
        let badges = require("../../Utils/functions").get_badges(this.public_flags)
        return badges
    }

    get createdAt(){
        return require("../../Methods/general").createdAt(this.id, "user")
    }

    get avatarURL(){
        return require("../../Methods/general").iconURL(this.id, this.avatar, "user")
    }

    get bannerURL(){
        return require("../../Methods/general").iconURL(this.id, this.banner, "ubanner")
    }

    displayAvatarURL(extension){
        return require("../../Methods/general").iconURL(this.id, this.avatar, "user", extension)
    }

    displayBannerURL(extension){
        return require("../../Methods/general").iconURL(this.id, this.banner, "ubanner", extension)
    }

    get tag(){
       return `${this.username}#${this.discriminator}`
    }
}
module.exports = User