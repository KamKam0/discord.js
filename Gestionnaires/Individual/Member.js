class Member{
    constructor(member){
        this.user_id = member.user.id
        this.user = member.user ? member.user : null
        this.nick = member.nick ? member.nick : null
        this.avatar = member.avatar ? member.avatar : null
        this.roles = member.roles ? member.roles : []
        this.premium_since = member.premium_since ?  member.premium_since : null
        this.joined_at = member.joined_at
        this.deaf = member.deaf ? member.deaf : null
        this.mute = member.mute ? member.mute : null
        this.pending = member.pending ? member.pending : false
        this.permissions = member.permissions ? member.permissions : null
        this.communication_disabled_until = member.communication_disabled_until ? member.communication_disabled_until : null
        this.guild = member.guild ? member.guild : null
        this.bot_token = member.token
        this.guild_id = member.guild_id
        this.vguild_id = member.guild ? member.guild.vguild_id : null
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

    Modify_Datas(member){
        let tocheck = Object.entries(member)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    kick(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/kick")(this.bot_token, this.guild_id, this.user_id, options)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - kick, member")
                er.content = err
                reject(er)
            })
        })
    }

    ban(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/ban").ban(this.bot_token, this.guild_id, this.user_id, options)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - ban, member")
                er.content = err
                reject(er)
            })
        })
    }

    send(options){
        return new Promise(async (resolve, reject) => {
            if(this.user.dm){
                require("../../Methods/message").send(this.bot_token, this.user.dm, options)
                .then(da => { return resolve(da)})
                .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - send, member")
                    er.content = err
                    reject(er)
                })
            }else{
                require("../../Methods/user").createDM(this.bot_token, this.user.id)
                .then(datas => { 
                    if(datas){
                        this.user.SetDM(datas.id)
                        require("../../Methods/message").send(this.bot_token, this.user.dm, options)
                        .then(da => { return resolve(da)})
                        .catch(err => {
                            let er = new Error("Une erreur s'est produite lors de la requête - send, member dm method")
                            er.content = err
                            reject(er)
                        })
                    }
                })
                .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - send, member createdm mehtod")
                    er.content = err
                    reject(er)
                })
            }
        })
    }
    
    mute(time){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/mute").mute(this.bot_token, this.guild_id, this.user_id, time)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - mute, member")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
    
    unmute(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/mute").unmute(this.bot_token, this.guild_id, this.user_id)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - unmute, member")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    haspermission(permission){
        return require("../../Methods/permissions").wawper(this.guild, this.user_id, permission)
    }

    hasrole(ID){
        if(!this.roles.includes(ID)) return false
        else return true
    }

    addrole(roleid){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/roles").add(this.bot_token, this.guild_id, roleid, this.user_id)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - addrole, member")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    removerole(roleid){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/roles").remove(this.bot_token, this.guild_id, roleid, this.user_id)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - removerole, member")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    modify(options){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").modifymember(this.bot_token, this.guild_id, this.user_id, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - modify, member")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
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