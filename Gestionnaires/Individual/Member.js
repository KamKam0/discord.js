class Member{
    constructor(member, bot){
        this.user_id = member.user.id
        this.user = this.user_id ? bot.users.get(this.user_id) : null
        this.nick = member.nick || null
        this.avatar = member.avatar || null
        this.roles = member.roles || []
        this.premium_since = member.premium_since || null
        this.joined_at = member.joined_at
        this.deaf = member.deaf || null
        this.mute = member.mute || null
        this.pending = member.pending || false
        this.permissions = member.permissions || null
        this.communication_disabled_until = member.communication_disabled_until || null
        this.guild = member.guild_id ? bot.guilds.get(member.guild_id) : null
        this.bot_token = bot.discordjs.token
        this.guild_id = member.guild_id
        this.vguild_id = this.guild ? this.guild.vguild_id : null
        this._bot = bot
    }

    Modify_Datas(member){
        let tocheck = Object.entries(member)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    kick(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/kick")(this.bot_token, this.guild_id, this.user_id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    ban(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/ban").ban(this.bot_token, this.guild_id, this.user_id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

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
    
    mute(time){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/mute").mute(this.bot_token, this.guild_id, this.user_id, time, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
    
    unmute(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/mute").unmute(this.bot_token, this.guild_id, this.user_id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    haspermission(permission){
        return require("../../Methods/permissions").wawper(this.guild, this.user_id, permission, this._bot)
    }

    hasrole(ID){
        if(!this.roles.includes(ID)) return false
        else return true
    }

    addrole(roleid){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/roles").add(this.bot_token, this.guild_id, roleid, this.user_id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    removerole(roleid){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/roles").remove(this.bot_token, this.guild_id, roleid, this.user_id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

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

    displayAvatarURL(extension){
        return require("../../Methods/general").iconURL({guild_id: this.guild_id, user_id: this.user_id}, this.avatar, "member", extension)
    }
}
module.exports = Member