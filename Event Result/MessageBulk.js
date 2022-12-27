class MessageBulk{
    constructor(message_bulk, bot){
        this.ids = message_bulk.ids
        this.channel_id = message_bulk.channel_id
        this.channel = message_bulk.channel
        this.guild = message_bulk.guild
        this.guild_id = message_bulk.guild_id
        this.bot_token = message_bulk.token
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
module.exports = MessageBulk