const eventupdate = require("./results/eventuserupdate")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    datas.type = "add"
    let event = new eventupdate(datas, bot)
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, event)
}

function name(){ return "GUILD_SCHEDULED_EVENT_USER_ADD" }