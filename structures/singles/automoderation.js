const Base = require("../bases/baseguild")
const Channels = require("../Multiple/Channels")
const Roles = require("../Multiple/Roles")
class Ban extends Base{
    constructor(automod, bot){
        super(automod, bot)
        this.id = automod.id
        this.name = automod.name
        this.creator_id = automod.creator_id
        this.creator = bot.users.get(this.creator_id) || null
        this.event_type	= this.#eventtyep(automod.event_type)
        this.trigger_type = this.#triggertyep(automod.trigger_type)
        this.trigger_metadata = automod.trigger_metadata
        this.actions = {type: this.#actiontype(automod.actions.type), metadata: {channel_id: automod.actions.metadata?.channel_id || null, channel: bot.channels.get(automod.actions.metadata?.channel_id), duration_seconds: automod.actions.metadata?.duration_seconds || null}}
        this.enabled = automod.enabled
        this.exempt_roles = (new Roles(bot)).push(datas.exempt_roles.map(ro => this.guild.roles.get(ro)).filter(e => e))
        this.exempt_channels = (new Channels(bot)).push(datas.exempt_channels.map(ch => this.guild.channels.get(ch)).filter(e => e))
    }

    #eventtyep(type){
        return this._typechange({
            1: "MESSAGE_SEND"
        }, type)
    }

    #triggertyep(type){
        return this._typechange({
            1: "KEYWORD",
            3: "SPAM",
            4: "KEYWORD_PRESET",
            5: "MENTION_SPAM"
        }, type)
    }

    #actiontype(type){
        return this._typechange({
            1: "BLOCK_MESSAGE",
            2: "SEND_ALERT_MESSAGE",
            3: "TIMEOUT"
        }, type)
    }

    _Modify_Datas(automod){
        let tocheck = Object.entries(automod)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "event_type"){
                    if(this[e[0]] !== this.#eventtyep(e[1])) this[e[0]] = this.#eventtyep(e[1])
                }
                else if(e[0] === "trigger_type"){
                    if(this[e[0]] !== this.#triggertyep(e[1])) this[e[0]] = this.#triggertyep(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        this._Modify_Get_Datas()
        if(this.actions.metadata.channel) this.actions.metadata.channel = bot.channels.get(this.actions.metadata.channel_id)
        return this
    }

    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return require("../../methods/automoderation").modify(informations, options)
    }

    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            guild_id: this.guild_id
        }
        return require("../../methods/automoderation").delete(informations)
    }

}
module.exports = Ban