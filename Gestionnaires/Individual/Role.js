const Base = require("./base")
class Role extends Base{
    constructor(role, bot){
        super(bot)
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
        this.tags = role.tags || null
        this.guild = role.guild || bot.guilds.get(role.guild_id) || null
        this.guild_id = role.guild_id
    }
    
    __Modify_Datas(role){
        let tocheck = Object.entries(role)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        this.__Modify_Get_Datas()
        return this
    }
    
    /**
     * 
     * @returns 
     */
    delete(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/roles").delete(this.bot_token, this.guild_id, this.id, this._bot)
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
            require("../../Methods/roles").modify(this.bot_token, this.guild_id, this.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    get iconURL(){
        return require("../../Methods/general").iconURL(this.id, this.icon, "role")
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayIconURL(extension){
        return require("../../Methods/general").iconURL(this.id, this.icon, "role", extension)
    }
}
module.exports = Role