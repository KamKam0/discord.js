const BaseGuild = require("../bases/baseguild")
class Role extends BaseGuild{
    constructor(role, bot){
        super(role, bot)
        
        this.id = role.id
        this.name = role.name
        this.color = role.color
        this.hoist = role.hoist ?? false
        this.icon = role.icon || null
        this.unicode_emoji = role.unicode_emoji || null
        this.position = role.position
        this.permissions = role.permissions
        this.managed = role.managed || null
        this.mentionable = role.mentionable
        this.tags = role.tags || {}
        this.flags = role.flags || 0
    }
    
    _Modify_Datas(role){
        let tocheck = Object.entries(role)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        this._Modify_Get_Datas()
        return this
    }
    
    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return require("../../methods/roles").delete(informations)
    }
    
    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return require("../../methods/roles").modify(informations, options)
    }

    get iconURL(){
        return require("../../methods/general").iconURL(this.id, this.icon, "role")
    }

    displayIconURL(extension){
        return require("../../methods/general").iconURL(this.id, this.icon, "role", extension)
    }
}
module.exports = Role