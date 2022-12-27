class MessageDelete{
    constructor(message, bot){
        this.id = message.id
        this.channel_id = message.channel_id
        this.channel = message.channel ? message.channel : require("../Utils/functions").channel_backup(message.channel_id, message.bot_token)
        this.guild = message.guild
        this.guild_id = message.guild_id ? message.guild_id : null
        this.bot_token = message.token
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
module.exports = MessageDelete