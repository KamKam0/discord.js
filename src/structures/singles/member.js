const Base = require("../bases/baseguild")
const Roles = require("../administrators/memberroles")
const methods = {
    user: require("../../methods/user"),
    message: require("../../methods/message"),
    kick: require("../../methods/kick"),
    ban: require("../../methods/ban"),
    mute: require("../../methods/mute"),
    permissions: require("../../methods/permissions"),
    role: require("../../methods/role"),
    guild: require("../../methods/guild"),
    general: require("../../methods/general")
}

class Member extends Base{
    constructor(member, bot){
        super(member, bot)
        this.user_id = member.user?.id || member.user_id
        this.user = bot.users.get(this.user_id) || null
        this.nick = member.nick || null
        this.avatar = member.avatar || null
        this.premium_since = member.premium_since || null
        this.joined_at = member.joined_at
        this.deaf = member.deaf ?? false
        this.mute = member.mute ?? false
        this.unusual_dm_activity_until = member.unusual_dm_activity_until || null
        this.roles = new Roles(bot, this.guild_id, this.user_id)
        this.#handleRoles(member.roles)
        this.voice = {presence: this.guild?.voice_states?.get(this.user_id) || null, channel: this.guild?.voice_states?.get(this.user_id)?.channel || null}
        this.pending = member.pending ?? false
        this.permissions = member.permissions || null
        this.communication_disabled_until = member.communication_disabled_until || null
    }

    #handleRoles(roles){
        if(!roles) return
        if(!Array.isArray(roles)) return
        if(typeof roles[0] !== "string") return this.roles.container = roles
        let trueroles = roles.map(id => this.guild.roles.get(id))
        this.roles.container = trueroles
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async kick(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            guild_id: this.guild_id
        }
        return methods.kick(informations, options)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async ban(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            guild_id: this.guild_id
        }
        return methods.ban.ban(informations, options)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async send(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            channel_id: this.user.dm
        }

        if(this.user.dm){
            return methods.message.send(informations, options)
        }

        let datas = await methods.user.createDM({bot: this._bot, botToken: this._token}, this.user_id).catch(err => {
            return Promise.reject(err)
        })
        if(datas){
            this.user.setDM(datas.id)
            informations.channel_id = this.user.dm
            return methods.message.send(informations, options)
        }
    }
    
    /**
     * 
     * @param {number} time 
     * @returns 
     */
    async muteMember(time, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            guild_id: this.guild_id
        }
        return methods.mute.mute(informations, {payload: time, reason: options})
    }
    
    /**
     * 
     * @returns 
     */
    async unmuteMember(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            guild_id: this.guild_id
        }
        return methods.mute.unmute(informations, options)
    }

    /**
     * 
     * @param {object[]} permission 
     * @returns 
     */
    hasPermission(permission){
        return methods.permissions(this.guild, this.user_id, permission, this._bot)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            guild_id: this.guild_id
        }
        return methods.guild.modifymember(informations, options)
    }


    get avatarURL(){
        if(!this.avatar) return this.user?.avatarURL
        return methods.general.iconURL({guild_id: this.guild_id, user_id: this.user_id}, this.avatar, "member")
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayAvatarURL(extension){
        if(!this.avatar) return this.user?.displayAvatarURL(extension)
        return methods.general.iconURL({guild_id: this.guild_id, user_id: this.user_id}, this.avatar, "member", extension)
    }
}
module.exports = Member