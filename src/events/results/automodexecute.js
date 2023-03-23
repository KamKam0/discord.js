const guildBase = require("../../structures/bases/baseguild")
class AutoModerationExecution extends guildBase{
    constructor(automod, bot){
        super(automod, bot)
        
        this.action = automod.action.map(act => {
            act.type = this.#actionType(act.type)
            if(act.metadata.channel_id){
                act.metadata.channel = this._bot.channels.get(act.metadata.channel_id)
            }
            return act
        })

        this.rule_id = automod.rule_id
        this.rule_trigger_type = this.#triggerType(automod.rule_trigger_type)

        this.user_id = automod.user_id
        this.user = this._bot.users.get(this.user_id) || null
        this.channel_id = automod.channel_id
        this.user = this._bot.channels.get(this.channel_id) || null
        this.message_id = automod.message_id
        this.message = this.guild.messages.get(this.message_id) || null

        this.alert_system_message_id = automod.alert_system_message_id
        this.content = automod.content
        this.matched_keyword = automod.matched_keyword
        this.matched_content = automod.matched_content
    }

    #triggerType(type){
        return this._typechange({
            1: "MESSAGE_SEND"
        }, type)
    }

    #actionType(type){
        return this._typechange({
            1: "MESSAGE_SEND"
        }, type)
    }
}
module.exports = AutoModerationExecution