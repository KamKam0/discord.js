class MessageReactionRemoveAll{
    constructor(message_add, bot){
        this.channel_id = message_add.channel_id
        this.guild = message_add.guild
        this.guild_id = message_add.guild_id
        this.bot_token = message_add.token
        this.message_id = message_add.message_id
        this.channel = message_add.channel
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
module.exports = MessageReactionRemoveAll