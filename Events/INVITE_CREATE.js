const Invite = require("../Gestionnaires/Individual/Invite")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    datas.token = bot.discordjs.token
    if(bot.database_state === "stable") bot.emit(name(), bot, (new Invite(datas)).SetChannel(guild.channels.get(datas.channel_id)).SetGuild(guild).SetInviter(bot.users.get(datas.inviter.id)))
}

function name(){ return "INVITE_CREATE" }