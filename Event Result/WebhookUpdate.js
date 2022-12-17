class WebhookUpdate{
    constructor(webhook){
        this.guild = webhook.guild
        this.guild_id = webhook.guild_id
        this.bot_token = webhook.token
        this.channel_id = webhook.channel_id
        this.channel = webhook.channel
        this.vguild_id = null
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
module.exports = WebhookUpdate