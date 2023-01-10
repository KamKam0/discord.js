class EventUserUpdate{
    constructor(eventupdate, bot){
        this.guild_scheduled_event_id = eventupdate.guild_scheduled_event_id || null
        this.guild_scheduled_event = eventupdate.guild || bot.guilds.get(eventupdate.guild_scheduled_event_id) || null
        this.user_id = eventupdate.user_id || null
        this.user = this.user_id ? bot.users.Get(this.user_id) : null
        this.guild = this.guild_scheduled_event
        this.guild_id = this.guild_scheduled_event_id
        this.bot_token = bot.discordjs.token
        this._bot = bot
    }
}
module.exports = EventUserUpdate