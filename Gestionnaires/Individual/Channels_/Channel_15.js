const Base = require("./Bases/base")
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
        if(isNaN(type)) return type
        else{
            let convert = {
                0: "lastest_activity",
                1: "creation_date"
            }
            return convert[type]
        }
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    edit(options){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").modify(this.bot_token, this.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
    
    /**
     * 
     * @param {object} options 
     * @returns 
     */
    createthread(options){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/threads").create_tforum(this.bot_token, this.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
}
module.exports = Channel