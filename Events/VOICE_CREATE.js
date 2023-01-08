module.exports = async (bot, voice) => {
    const guild = bot.guilds.get(voice.guild_id)
    guild.voice_states.AddVoice(voice)
    guild.members.get(voice.user_id).voice = {presence: guild.voice_states.get(voice.user_id), channel: guild.voice_states.get(voice.user_id)?.channel || null}
    if(bot.database_state !== "unstable") bot.emit(name(), bot, guild.voice_states.get(voice.user_id))
}

function name(){ return "VOICE_CREATE" }