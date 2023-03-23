const Base = require("../../bases/channels/base")
const channelMethod = require("../../../methods/channel")
const threadMethod = require("../../../methods/thread")
const forumTypes = require("../../../types/forum")

class Channel extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.position = channel.position
        this.permission_overwrites = channel.permission_overwrites
        this.name = channel.name
        this.nsfw = channel.nsfw ?? false
        this.parent_id = channel.parent_id || null
        this.parent = this.parent_id ? bot.channels.get(this.parent_id) : null
        this.guild_id = channel.guild_id
        this.guild = channel.guild || bot.guilds.get(this.guild_id) || null
        this.topic = channel.topic
        this.rate_limit_per_user = channel.rate_limit_per_user
        this.template = channel.template
        this.default_sort_order = this.#type2(channel.default_sort_order)
        this.default_reaction_emoji = channel.default_reaction_emoji
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