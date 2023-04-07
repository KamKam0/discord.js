const Base = require("../bases/base")
const userMethod = require("../../methods/user")
const generalMethod = require("../../methods/general")
const messageMethod = require("../../methods/message")
const utils = require("../../utils/functions")

class User extends Base{
    constructor(user, bot){
        super(bot)
        this.id = user.id || null
        this.username = user.username || null
        this.discriminator = user.discriminator || null
        this.avatar = user.avatar || null
        this.bot = this.username ? (user.bot ?? false) : true
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
                return messageMethod.send(informations, options)
            }else{
                userMethod.createDM({bot: this._bot, botToken: this._token}, this.id)
                .then(datas => { 
                    if(datas){
                        this.dm = datas.id
                        informations.channel_id = this.dm
                        messageMethod.send(informations, options)
                        .then(result => resolve(result))
                        .catch(err => reject(err))
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
        let badges = utils.gets.getBadges(this.public_flags)
        return badges
    }

    get createdAt(){
        return generalMethod.createdAt(this.id, "user")
    }

    get avatarURL(){
        return generalMethod.iconURL(this.id, this.avatar, "user")
    }

    get bannerURL(){
        return generalMethod.iconURL(this.id, this.banner, "ubanner")
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayAvatarURL(extension){
        return generalMethod.iconURL(this.id, this.avatar, "user", extension)
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayBannerURL(extension){
        return generalMethod.iconURL(this.id, this.banner, "ubanner", extension)
    }

    get tag(){
       return `${this.username}#${this.discriminator}`
    }

    setDM(id){
        this.dm = id
    }
}
module.exports = User