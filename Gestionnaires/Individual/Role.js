class Role{
    constructor(role, bot){
        this.id = role.id
        this.name = role.name
        this.color = role.color
        this.hoist = role.hoist ? role.hoist : false
        this.icon = role.icon ? role.icon : null
        this.unicode_emoji = role.unicode_emoji ? role.unicode_emoji : null
        this.position = role.position
        this.permissions = role.permissions
        this.managed = role.managed ? role.managed : null
        this.mentionable = role.mentionable
        this.tags = role.tags ? role.tags : null
        this.guild = role.guild ? role.guild : null
        this.guild_id = role.guild_id
        this.bot_token = role.token
        this.vguild_id = role.guild ? role.guild.vguild_id : null
        this._bot = bot
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }
    
    Modify_Datas(role){
        let tocheck = Object.entries(role)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }
    
    delete(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/roles").delete(this.bot_token, this.guild_id, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
    
    modify(options){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/roles").modify(this.bot_token, this.guild_id, this.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    get iconURL(){
        return require("../../Methods/general").iconURL(this.id, this.icon, "role")
    }

    displayIconURL(extension){
        return require("../../Methods/general").iconURL(this.id, this.icon, "role", extension)
    }
}
module.exports = Role