const Base = require("./base")
const Roles = require("../Multiple/Roles")
class Member extends Base{
    constructor(member, bot){
        super(bot)
        this.user_id = member.user?.id || member.user_id
        this.user = bot.users.get(this.user_id) || null
        this.nick = member.nick || null
        this.avatar = member.avatar || null
        this.premium_since = member.premium_since || null
        this.joined_at = member.joined_at
        this.deaf = member.deaf ?? false
        this.mute = member.mute ?? false
        this.guild_id = member.guild_id
        this.guild = member.guild || bot.guilds.get(this.guild_id) || null
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
        roles.container = trueroles
    }

    __Modify_Datas(member){
        let tocheck = Object.entries(member)
        tocheck.forEach(e => { 
            if(e[0] === "roles"){
                let t1 = this.roles.map(e => e.id).filter(role => !e[1].map(e => e.id).includes(role))
                let t2 = e[1].map(e => e.id).filter(role => !this.roles.map(e => e.id).includes(role))
                if(t1 || t2) this.#handleRoles(member.roles)
            }
            else if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        this.__Modify_Get_Datas()
        return this
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    kick(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/kick")(this.bot_token, this.guild_id, this.user_id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    ban(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/ban").ban(this.bot_token, this.guild_id, this.user_id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    send(options){
        return new Promise(async (resolve, reject) => {
            if(this.user.dm){
                require("../../Methods/message").send(this.bot_token, this.user.dm, options, undefined, undefined, this._bot)
                .then(da => { return resolve(da)})
                .catch(err => reject(err))
            }else{
                require("../../Methods/user").createDM(this.bot_token, this.user.id, this._bot)
                .then(datas => { 
                    if(datas){
                        this.user.SetDM(datas.id)
                        require("../../Methods/message").send(this.bot_token, this.user.dm, options, undefined, undefined, this._bot)
                        .then(da => { return resolve(da)})
                        .catch(err => reject(err))
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
    mute(time){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/mute").mute(this.bot_token, this.guild_id, this.user_id, time, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
    
    /**
     * 
     * @returns 
     */
    unmute(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/mute").unmute(this.bot_token, this.guild_id, this.user_id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {object[]} permission 
     * @returns 
     */
    haspermission(permission){
        return require("../../Methods/permissions").wawper(this.guild, this.user_id, permission, this._bot)
    }

    /**
     * 
     * @param {string} ID 
     * @returns 
     */
    hasrole(ID){
        if(!this.roles.includes(ID)) return false
        else return true
    }

    /**
     * 
     * @param {string} roleid 
     * @returns 
     */
    addrole(roleid){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/roles").add(this.bot_token, this.guild_id, roleid, this.user_id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {string} roleid 
     * @returns 
     */
    removerole(roleid){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/roles").remove(this.bot_token, this.guild_id, roleid, this.user_id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    modify(options){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").modifymember(this.bot_token, this.guild_id, this.user_id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }


    get avatarURL(){
        return require("../../Methods/general").iconURL({guild_id: this.guild_id, user_id: this.user_id}, this.avatar, "member")
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayAvatarURL(extension){
        return require("../../Methods/general").iconURL({guild_id: this.guild_id, user_id: this.user_id}, this.avatar, "member", extension)
    }
}
module.exports = Member