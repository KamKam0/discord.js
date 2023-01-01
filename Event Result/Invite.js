class Invite{
    constructor(invite, bot){
        this.code = invite.code
        this.guild_id = invite.guild_id || null
        this.channel_id = invite.channel_id || null
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.guild = invite.guild || bot.guilds.get(this.guild_id) || null
        this.bot_token = bot.discordjs.token
        this.vguild_id = this.guild ? this.guild.vguild_id : null
        this._bot = bot
    }
}
module.exports = Invite