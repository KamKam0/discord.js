const updateHandler = require('../../handlers/updateHandler')

module.exports = async (bot, newVoice) => {
    let updateParameters = {
        name: name(),
        path: 'voice_states',
        guild: true,
    }

    const updated = updateHandler(updateParameters, newVoice, bot)

    if (updated) {
        const guild = bot.guilds.get(newVoice.guild_id)
        const voiceModified = guild.voice_states.get(newVoice.user_id)
        guild.members.get(newVoice.user_id).voice = {presence: voiceModified, channel: voiceModified?.channel || null}
        
        guild.channels.get(updated.oldInstance.channel_id).members._delete(newVoice.user_id)
        guild.channels.get(newVoice.channel_id).members.container.push(guild.members.get(newVoice.user_id))
    }
}

function name(){ return "VOICE_UPDATE" }