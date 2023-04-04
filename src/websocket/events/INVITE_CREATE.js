const Invite = require('../../structures/singles/invite')
module.exports = async (bot, datas) => {
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, (new Invite(datas, bot)))
}

function name(){ return "INVITE_CREATE" }