const guildBase = require("../../structures/bases/baseguild")
class EventUserUpdate extends guildBase{
    constructor(eventupdate, bot){
        super(eventupdate, bot)

        this.guild_scheduled_event_id = eventupdate.guild_scheduled_event_id || null
        this.guild_scheduled_event = eventupdate.guild ? bot.guilds.get(eventupdate.guild_scheduled_event_id) : null
        this.user_id = eventupdate.user_id || null
        this.user = this.user_id ? bot.users.get(this.user_id) : null
        this.type = eventupdate.type
    }
}
module.exports = EventUserUpdate