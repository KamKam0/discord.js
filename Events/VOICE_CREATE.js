module.exports = async (bot, voice) => {
    const guild = bot.guilds.get(voice.guild_id)
    guild.voice_states.AddVoice(voice)
    if(bot.database_state === "stable") bot.emit(name(), bot, guild.voice_states.get(voice.user_id))
}

function name(){ return "VOICE_CREATE" }