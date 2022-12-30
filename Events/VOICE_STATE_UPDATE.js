module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    let member = guild.members.get(datas.user_id) 
    if (member?.user.id === bot.user.id)bot.voice.onVoiceStateUpdate(datas);

    if(!datas.guild_id|| !guild) return

    if(String(datas) !== "null" && datas.user_id === bot.user.id){
        guild.voice.channel = datas
        if(guild.voice.server) require("../Discord.js - Voice").manage(bot, guild.id)
    }

    const oldvoice = guild.voice_states.get(datas.user_id)
    const newvoice = datas

    if(String(oldvoice) === "undefined" && String(newvoice.channel_id) !== "null") if(bot.database_state !== "unstable") require("./VOICE_CREATE")(bot, newvoice)
    if(String(oldvoice) !== "undefined" && String(newvoice.channel_id) === "null"){
        oldvoice.guild_id = datas.guild_id
        if(bot.database_state !== "unstable") require("./VOICE_DELETE")(bot, oldvoice)
    }
    else if(String(oldvoice) !== "undefined" && String(newvoice.channel_id) !== "null" && String(oldvoice.channel_id) !==  String(newvoice.channel_id)) if(bot.database_state !== "unstable") require("./VOICE_UPDATE")(bot, oldvoice, newvoice)
}