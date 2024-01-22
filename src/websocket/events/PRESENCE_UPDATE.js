const Presence = require("../../structures/singles/presence")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)

    if(!datas.guild_id|| !guild) return

    if(`${datas.user ? datas.user.id : datas.user_id}` === bot.user.id) bot.presence = new Presence(datas, bot)

    let modifications = guild.presences._Treat(datas)

    if(modifications) bot.emit(name(), bot, modifications.oldInstance, modifications.newInstance, modifications.modifications)
   
}

function name(){ return "PRESENCE_UPDATE" }