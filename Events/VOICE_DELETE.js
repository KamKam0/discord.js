module.exports = async (bot, voice) => {
    const guild = bot.guilds.get(voice.guild_id)
    const oldvoice = guild.voice_states.get(voice.user_id)
    guild.voice_states.__DeleteVoice(voice.user_id)
    guild.channels.get(voice.channel_id).members.__DeleteMember(voice.user_id)
    if(bot.database_state !== "unstable") bot.emit(name(), bot, oldvoice)
}

function name(){ return "VOICE_DELETE" }