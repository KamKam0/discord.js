const Base = require("../bases/baseguild")
const Channels = require("../managers/channels")
const Roles = require("../managers/roles")
const automoderationMethod = require("../../methods/automoderation")
const automoderationTypes = require("../../types/automoderation")

class AutoModeration extends Base{
    constructor(automod, bot){
        super(automod, bot)

        this._modifyConstants.push({name: "event_type", data: automoderationTypes.revert.eventType()})
        this._modifyConstants.push({name: "trigger_type", data: automoderationTypes.revert.triggerType()})
        
        this.id = automod.id
        this.name = automod.name
        this.creator_id = automod.creator_id
        this.creator = bot.users.get(this.creator_id) || null
        this.event_type	= this._typechange(this._modifyConstants.find(e => e.name === "event_type").data, automod.event_type)
        this.trigger_type = this._typechange(this._modifyConstants.find(e => e.name === "trigger_type").data, automod.trigger_type)
        this.trigger_metadata = automod.trigger_metadata
        this.actions = {type: this.#actiontype(automod.actions.type), metadata: {channel_id: automod.actions.metadata?.channel_id || null, channel: bot.channels.get(automod.actions.metadata?.channel_id), duration_seconds: automod.actions.metadata?.duration_seconds || null}}
        this.enabled = automod.enabled
        this.exempt_roles = (new Roles(bot)).push(datas.exempt_roles.map(ro => this.guild.roles.get(ro)).filter(e => e))
        this.exempt_channels = (new Channels(bot)).push(datas.exempt_channels.map(ch => this.guild.channels.get(ch)).filter(e => e))
    }

    #actiontype(type){
        return this._typechange(automoderationTypes.revert.actionType(), type)
    }

    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return automoderationMethod.modify(informations, options)
    }

    async delete(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            guild_id: this.guild_id
        }
        return automoderationMethod.delete(informations, options)
    }

}
module.exports = AutoModeration