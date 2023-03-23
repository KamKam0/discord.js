const Base = require("../bases/baseguild")
const guildMethod = require("../../methods/guild")
const integrationTypes = require("../../types/integration")

class Integration extends Base{
    constructor(integration, bot){
        super(integration, bot)
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
        return this._typechange(integrationTypes.reverse(), type)
    }

    _Modify_Datas(inte){
        let tocheck = Object.entries(inte)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "expire_behavior"){
                    if(this[e[0]] !== this.#type(e[1])) this[e[0]] = this.#type(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        this._modifyGetDatas()
        return this
    }
    
    /**
     * 
     * @returns 
     */
    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return guildMethod.deleteintegration(informations)
    }
}
module.exports = Integration