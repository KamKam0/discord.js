const Invite = require("../Event Result/Invite")
module.exports = async (bot, datas) => {
    datas.token = bot.discordjs.token
    const guild = bot.guilds.get(datas.guild_id)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, (new Invite(datas, bot)).SetChannel(guild.channels.get(datas.channel_id)).SetGuild(guild))
}

function name(){ return "INVITE_DELETE" }