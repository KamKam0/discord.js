const Base = require("./base")
class Integration extends Base{
    constructor(int, bot){
        super(bot)
        this.guild_id = int.guild_id
        this.guild = int.guild || bot.guilds.get(this.guild_id) || null
        this.id = int.id
        this.name = int.name
        this.type = int.type
        this.enabled = int.enabled || null
        this.syncing = int.syncing ?? false
        this.role_id = int.role_id || null  
        this.enable_emoticons = int.enable_emoticons ?? false
        this.expire_behavior = this.#type(int.expire_behavior)
        this.expire_grace_period = int.expire_grace_period
        this.user_id = int.user ? int.user.id : null
        this.account = int.account || null
        this.synced_at = int.synced_at || null
        this.subscriber_count = int.subscriber_count
        this.revoked = int.revoked ?? false
        this.application_id = int.application ? int.application.id : null
        this.scopes = int.scopes || []
    }

    #type(type){
        return this.__typechange({
            0: "Remove role",
            1: "Kick"
        }, type)
    }

    __Modify_Datas(inte){
        let tocheck = Object.entries(inte)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "expire_behavior"){
                    if(this[e[0]] !== this.#type(e[1])) this[e[0]] = this.#type(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
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
            require("../../Methods/guild").deleteintegration(this.bot_token, this.guild_id, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
}
module.exports = Integration