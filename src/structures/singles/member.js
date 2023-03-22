const Base = require("../bases/baseGuild")
const Roles = require("../managers/roles")
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
        this.roles = new Roles(bot, this.guild_id)
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

    _Modify_Datas(member){
        let tocheck = Object.entries(member)
        tocheck.forEach(e => { 
            if(e[0] === "roles"){
                let t1 = this.roles.map(e => e.id).filter(role => !e[1].map(e => e.id).includes(role))
                let t2 = e[1].map(e => e.id).filter(role => !this.roles.map(e => e.id).includes(role))
                if(t1 || t2) this.#handleRoles(member.roles)
            }
            else if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        this._Modify_Get_Datas()
        return this
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
            channel_id: this.channel_id
        }
        return require("../../methods/kick")(informations, options)
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
            channel_id: this.channel_id
        }
        return require("../../methods/ban").ban(informations, options)
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
            id: this.user.dm,
            channel_id: this.channel_id
        }
        return new Promise(async (resolve, reject) => {
            if(this.user.dm){
                return require("../../methods/message").send(informations, options)
            }else{
                require("../../methods/user").createDM({bot: this._bot, botToken: this._token}, this.id)
                .then(datas => { 
                    if(datas){
                        this.user.SetDM(datas.id)
                        return require("../../methods/message").send(informations, options)
                    }
                })
                .catch(err => reject(err))
            }
        })
    }
    
    /**
     * 
     * @param {number} time 
     * @returns 
     */
    async mute(time){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            channel_id: this.channel_id
        }
        return require("../../methods/mute").mute(informations, time)
    }
    
    /**
     * 
     * @returns 
     */
    async unmute(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            channel_id: this.channel_id
        }
        return require("../../methods/mute").unmute(informations)
    }

    /**
     * 
     * @param {object[]} permission 
     * @returns 
     */
    hasPermission(permission){
        return require("../../methods/permissions").wawper(this.guild, this.user_id, permission, this._bot)
    }

    /**
     * 
     * @param {string} ID 
     * @returns 
     */
    hasRole(ID){
        if(!this.roles.get(ID)) return false
         return true
    }

    /**
     * 
     * @param {string} roleid 
     * @returns 
     */
    async addRole(roleid){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            channel_id: this.channel_id,
            role_id: roleid
        }
        return require("../../methods/roles").add(informations)
    }

    /**
     * 
     * @param {string} roleid 
     * @returns 
     */
    removeRole(roleid){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            channel_id: this.channel_id,
            role_id: roleid
        }
        return require("../../methods/roles").remove(informations)
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
            channel_id: this.channel_id
        }
        return require("../../methods/guild").modifymember(informations, options)
    }


    get avatarURL(){
        return require("../../methods/general").iconURL({guild_id: this.guild_id, user_id: this.user_id}, this.avatar, "member")
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayAvatarURL(extension){
        return require("../../methods/general").iconURL({guild_id: this.guild_id, user_id: this.user_id}, this.avatar, "member", extension)
    }
}
module.exports = Member