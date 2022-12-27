class Typing{
    constructor(typing, bot){
        this.channel_id = typing.channel_id
        this.channel = typing.channel
        this.guild = typing.guild
        this.guild_id = typing.guild_id
        this.bot_token = typing.token
        this.user_id = typing.user_id
        this.user = typing.user
        this.member = typing.member
        this.timestamp = typing.timestamp
        this.vguild_id = null
        this._bot = bot
    }

    SetUser(user){
        this.user = user
        return this
    }

    SetMember(member){
        this.member = member
        return this
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
module.exports = Typing