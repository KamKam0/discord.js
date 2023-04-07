const Base = require("../../bases/channels/baseguild")
const threadMethod = require("../../../methods/threads")
const forumTypes = require("../../../types/forum")
const ThreadAdministrator = require("../../administrators/threads")
const WebhooksAdministrator = require("../../administrators/webhooks")

class Channel extends Base{
    constructor(channel, bot){
        super(channel, bot)

        this._modifyConstants.push({name: "default_sort_order", data: forumTypes.revert()})

        this.topic = channel.topic
        this.rate_limit_per_user = channel.rate_limit_per_user
        this.template = channel.template
        this.default_sort_order = this._typechange(this._modifyConstants.find(e => e.name === "default_sort_order").data, channel.default_sort_order) || forumTypes.revert()[1]
        this.default_reaction_emoji = channel.default_reaction_emoji || null
        this.available_tags = channel.available_tags
        this.flags = channel.flags
        this.threads = new ThreadAdministrator(bot, this.guild_id)
        this.threads._addMultiple(this.guild.threads.filter(thread => thread.parent_id === this.id))
        this.webhooks = new WebhooksAdministrator(bot, this.guild_id, this.id)
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
            channel_id: this.id
        }
        if(typeof options.message === "string") options.message = { content: options.message }
        return threadMethod.create_tforum(informations, options)
    }
}
module.exports = Channel