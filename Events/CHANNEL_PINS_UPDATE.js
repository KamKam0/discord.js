const pins = require("../Event Result/PinUpdate")
module.exports = async (bot, datas) => {
    if(bot.database_state !== "unstable") bot.emit(name(), bot, (new pins({...datas})).SetGuild(bot.guilds.get(datas.guild_id)).SetChannel(bot.channels.get(datas.channel_id)))
}

function name(){ return "CHANNEL_PINS_UPDATE" }