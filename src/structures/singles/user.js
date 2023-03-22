const Base = require("../bases/base")
class User extends Base{
    constructor(user, bot){
        super(bot)
        this.id = user.id
        this.username = user.username
        this.discriminator = user.discriminator
        this.avatar = user.avatar
        this.bot = user.bot ?? false
        this.system = user.system || null
        this.mfa_enabled = user.mfa_enabled ?? false
        this.banner = user.banner || null
        this.accent_color = user.accent_color || null
        this.verified = user.verified ?? false
        this.email = user.email || null
        this.flags = user.flags || 0
        this.premium_type = user.premium_type || null
        this.public_flags = user.public_flags || null
        this.dm = null
        this.guilds = user.guild_id ? [user.guild_id] : []
    }

    _Modify_Datas(user){
        let tocheck = Object.entries(user)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        this._Modify_Get_Datas()
        return this
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async send(options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            channel_id: this.dm
        }
        return new Promise(async (resolve, reject) => {
            if(this.dm){
                return require("../../methods/message").send(informations, options)
            }else{
                require("../../methods/user").createDM({bot: this._bot, botToken: this._token}, this.id)
                .then(datas => { 
                    if(datas){
                        this.dm = datas.id
                        return require("../../methods/message").send(informations, options)
                    }
                })
                .catch(err => reject(err))
            }
        })
    }

    _compareuser(user){
        let tocheck = Object.entries(user)
        let errors = []
        tocheck.forEach(e => { 
            if(this[e[0]] !== e[1]) errors.push(e[0])
        })
        if(errors[0]) return {state: false, errors: errors}
        else return {state: true, errors: null}
    }

    /**
     * 
     * @returns 
     */
    displayPublicFlags(){
        if(this.public_flags === 0) return []
        let badges = require("../../utils/functions").get_badges(this.public_flags)
        return badges
    }

    get createdAt(){
        return require("../../methods/general").createdAt(this.id, "user")
    }

    get avatarURL(){
        return require("../../methods/general").iconURL(this.id, this.avatar, "user")
    }

    get bannerURL(){
        return require("../../methods/general").iconURL(this.id, this.banner, "ubanner")
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayAvatarURL(extension){
        return require("../../methods/general").iconURL(this.id, this.avatar, "user", extension)
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayBannerURL(extension){
        return require("../../methods/general").iconURL(this.id, this.banner, "ubanner", extension)
    }

    get tag(){
       return `${this.username}#${this.discriminator}`
    }
}
module.exports = User