class Typing{
    constructor(typing, bot){
        this.guild_id = typing.guild_id || null
        this.channel_id = typing.channel_id || null
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.guild = typing.guild || bot.guilds.get(this.guild_id) || null
        this.bot_token = bot.discordjs.token
        this.user_id = typing.user_id || null
        this.user = this.user_id ? bot.users.get(this.user_id) : null
        this.member = this.guild && this.user_id ? this.guild.members.get(this.user_id) : null
        this.timestamp = typing.timestamp
        this._bot = bot
    }
}
module.exports = Typing