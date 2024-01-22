const Invite = require('../../structures/singles/invite')
module.exports = async (bot, datas) => {
    bot.emit(name(), bot, (new Invite(datas, bot)))
}

function name(){ return "INVITE_DELETE" }