class Invite{
    constructor(invite, bot){
        this.code = invite.code
        this.guild_id = invite.guild_id
        this.channel_id = invite.channel_id
        this.channel = invite.channel
        this.guild = invite.guild
        this.bot_token = invite.token
        this.vguild_id = null
        this._bot = bot
    }

    SetChannel(channel){
        this.channel = channel
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }
}
module.exports = Invite