const Base = require("../bases/baseguild")
const guildMethod = require("../../methods/guild")
const integrationTypes = require("../../types/integration")

class Integration extends Base{
    constructor(integration, bot){
        super(integration, bot)

        this._modifyConstants.push({name: "expire_behavior", data: integrationTypes.revert()})

        this.id = integration.id
        this.name = integration.name
        this.type = integration.type
        this.enabled = integration.enabled || null
        this.syncing = integration.syncing ?? false
        this.role_id = integration.role_id || null  
        this.enable_emoticons = integration.enable_emoticons ?? false
        this.expire_behavior = this._typechange(this._modifyConstants.find(e => e.name === "expire_behavior").data, integration.expire_behavior)
        this.expire_grace_period = integration.expire_grace_period
        this.user_id = integration.user ? integration.user.id : null
        this.account = integration.account || null
        this.synced_at = integration.synced_at || null
        this.subscriber_count = integration.subscriber_count
        this.revoked = integration.revoked ?? false
        this.application_id = integration.application ? integration.application.id : null
        this.scopes = integration.scopes || []
    }
    
    /**
     * 
     * @returns 
     */
    async delete(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return guildMethod.deleteintegration(informations, options)
    }
}
module.exports = Integration