const Typing = require("../Event Result/Typing")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(guild) if(bot.database_state !== "unstable") bot.emit(name(), bot, (new Typing(datas, bot)).SetGuild(guild).SetChannel(guild.channels.get(datas.channel_id)).SetMember(guild.members.get(datas.user_id)).SetUser(bot.users.get(datas.user_id)))
    if(!guild) if(bot.database_state !== "unstable") bot.emit(name(), bot, (new Typing(datas, bot)))
}

function name(){ return "TYPING_START" }