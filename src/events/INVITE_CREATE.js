const Invite = require("../Gestionnaires/Individual/Invite")
module.exports = async (bot, datas) => {
    datas.token = bot.discordjs.token
    if(bot.database_state !== "unstable") bot.emit(name(), bot, (new Invite(datas, bot)))
}

function name(){ return "INVITE_CREATE" }