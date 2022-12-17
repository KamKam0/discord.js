class EventUserUpdate{
    constructor(eventupdate){
        this.guild_scheduled_event_id = eventupdate.guild_scheduled_event_id
        this.guild_scheduled_event = eventupdate.guild_scheduled_event
        this.user_id = eventupdate.user_id
        this.user = eventupdate.user
        this.guild = eventupdate.guild
        this.guild_id = eventupdate.guild_id
        this.bot_token = eventupdate.token
        this.vguild_id = null
    }

    SetUser(user){
        this.user = user
        return this
    }    

    SetEventChannel(channel){
        this.guild_scheduled_event = channel
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }
}
module.exports = EventUserUpdate