module.exports = async (bot, voice) => {
    const guild = bot.guilds.get(voice.guild_id)
    const oldvoice = guild.voice_states.get(voice.user_id)
    guild.members.get(voice.user_id).voice = {presence: null, channel: null}
    guild.voice_states._delete(voice.user_id)
    guild.channels.get(voice.channel_id).members._delete(voice.user_id)
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, oldvoice)
}

function name(){ return "VOICE_DELETE" }