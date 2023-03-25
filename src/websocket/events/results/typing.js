const guildBase = require("../../../structures/bases/baseguild")
class Typing extends guildBase{
    constructor(typing, bot){
        super(typing, bot)
        
        this.channel_id = typing.channel_id || null
        this.channel = this.channel_id ? this._bot.channels.get(this.channel_id) : null
        this.user_id = typing.user_id || null
        this.user = this.user_id ? this._bot.users.get(this.user_id) : null
        this.member = this.guild && this.user_id ? this.guild.members.get(this.user_id) : null
        this.timestamp = typing.timestamp
    }
}
module.exports = Typing