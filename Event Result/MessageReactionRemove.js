class MessageReactionRemove{
    constructor(message_add, bot){
        this.user_id = message_add.user_id
        this.user = message_add.user
        this.member = message_add.member
        this.channel_id = message_add.channel_id
        this.channel = message_add.channel ? message_add.channel : require("../Utils/functions").channel_backup(message_add.channel_id, message_add.bot_token, bot)
        this.guild = message_add.guild
        this.guild_id = message_add.guild_id ? message_add.guild_id : null
        this.bot_token = message_add.token
        this.message_id = message_add.message_id
        this.emoji = message_add.emoji
        this.vguild_id = null
        this._bot = bot
    }

    SetMember(member){
        this.member = member
        return this
    }

    SetUser(user){
        this.user = user
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
module.exports = MessageReactionRemove