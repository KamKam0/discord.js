const Base = require("../../bases/channels/baseguild")
const channelMethod = require("../../../methods/channel")
const threadMethod = require("../../../methods/threads")
const forumTypes = require("../../../types/forum")

class Channel extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.topic = channel.topic
        this.rate_limit_per_user = channel.rate_limit_per_user
        this.template = channel.template
        this.default_sort_order = this.#type2(channel.default_sort_order) || forumTypes.revert()[1]
        this.default_reaction_emoji = channel.default_reaction_emoji || null
        this.available_tags = channel.available_tags
        this.flags = channel.flags
    }

    #type2(type){
        return this._typechange(forumTypes.revert(), type)
    }

    /**
     * 
     * @param {object[]} options 
     * @returns 
     */
    async edit(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return channelMethod.modify(informations, options)
    }
    
    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async createThread(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return threadMethod.create_tforum(informations, options)
    }
}
module.exports = Channel