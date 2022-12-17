const eventupdate = require("../Event Result/EventUserUpdate")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    let event = guild.guild_scheduled_events.get(datas.guild_scheduled_event_id)
    event = new eventupdate({...event, user: bot.users.get(datas.user_id)})
    event.SetGuild(guild)
    if(bot.database_state === "stable") bot.emit(name(), bot, event)
}

function name(){ return "GUILD_SCHEDULED_EVENT_USER_REMOVE" }