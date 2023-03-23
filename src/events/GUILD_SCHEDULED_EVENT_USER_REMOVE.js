const eventupdate = require("./results/eventuserupdate")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    datas.type = "remove"
    let event = new eventupdate(datas, bot)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, event)
}

function name(){ return "GUILD_SCHEDULED_EVENT_USER_REMOVE" }