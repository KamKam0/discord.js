const Invite = require('../structures/singles/invite')
module.exports = async (bot, datas) => {
    if(bot.database_state !== "unstable") bot.emit(name(), bot, (new Invite(datas, bot)))
}

function name(){ return "INVITE_DELETE" }