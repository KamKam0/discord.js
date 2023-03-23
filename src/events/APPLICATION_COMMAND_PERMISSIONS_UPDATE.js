const applicationPermissions = require("../structures/singles/permissions/application")
module.exports = async (bot, datas) => {
    let result = new applicationPermissions(datas, bot)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, result)
}

function name(){ return "APPLICATION_COMMAND_PERMISSIONS_UPDATE" }