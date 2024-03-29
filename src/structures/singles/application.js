const Base = require("../bases/baseguild")
const ApplicationMetadataManager = require('../managers/applicationmetadatas')
const applicationMethod = require('../../methods/application')
const utils = require("../../utils/functions")

class Application extends Base{
    constructor(application, bot){
        super(application, bot)
        this._modifyConstants.push({name: "flags", function: utils.gets.getApplicationFlags})
        this._modifyConstants.push({name: "discovery_eligibility_flags", function: utils.gets.getApplicationFlags})

        this.id	= application.id
        this.name = application.name
        this.icon = application.icon || null
        this.description = application.description || null
        this.rpc_origins = application.rpc_origins || []
        this.bot_public = application.bot_public ?? false
        this.bot_require_code_grant = application.bot_require_code_grant ?? false
        this.terms_of_service_url = application.terms_of_service_url || null
        this.privacy_policy_url = application.privacy_policy_url || null
        this.owner = application.owner || null
        this.verify_key = application.verify_key || null
        this.team = application.team || null
        this.primary_sku_id = application.primary_sku_id || null
        this.slug = application.slug || null
        this.cover_image = application.cover_image || null
        this.flags = this._modifyConstants.find(e => e.name === "flags").function(application.flags || 0)
        this.approximate_guild_count = application.approximate_guild_count || 0
        this.tags = application.tags || []
        this.install_params = application.install_params || null
        this.custom_install_url = application.custom_install_url || null
        this.role_connections_verification_url = application.role_connections_verification_url || null
        this.type = application.type || null,
        this.bot = application.bot || null,
        this.summary = application.summary || null,
        this.hook = application.hook || false,
        this.redirect_uris = application.redirect_uris || [],
        this.interactions_endpoint_url = application.interactions_endpoint_url || null,
        this.interactions_event_types = application.interactions_event_types || [],
        this.interactions_version = application.interactions_version,
        this.explicit_content_filter = application.explicit_content_filter,
        this.rpc_application_state = application.rpc_application_state,
        this.store_application_state = application.store_application_state,
        this.creator_monetization_state = application.creator_monetization_state,
        this.verification_state = application.verification_state,
        this.integration_public = application.integration_public || false,
        this.integration_require_code_grant = application.integration_require_code_grant || false,
        this.discoverability_state = application.discoverability_state,
        this.discovery_eligibility_flags = this._modifyConstants.find(e => e.name === "discovery_eligibility_flags").function(application.discovery_eligibility_flags || 0)
        this.roleConnectionsMetadata = new ApplicationMetadataManager(this._bot)
    }

    async getMe(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
        }
        return applicationMethod.getMe(informations)
    }
}
module.exports = Application