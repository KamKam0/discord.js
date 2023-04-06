const GuildText = require("../../bases/channels/guildtext")
const ThreadAdministrator = require("../../administrators/threads")
class Channel extends GuildText{
    constructor(channel, bot){
        super(channel, bot)
        this.topic = channel.topic || null
        this.threads = new ThreadAdministrator(bot, this.guild_id)
        this.threads._addMultiple(this.guild.threads.filter(thread => thread.parent_id === this.id))
    }
}
module.exports = Channel