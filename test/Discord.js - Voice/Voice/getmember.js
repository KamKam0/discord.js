const errors = require("../utils/errors.json")

module.exports = (bot, guild_id, memberid) => {
    if(!bot) return ({code: errors["34"].code, message: errors["34"].message})
    if(!guild_id) return ({code: errors["1"].code, message: errors["1"].message})
    const guild = bot.guilds.get(guild_id)
    if(!guild) return ({code: errors["50"].code, message: errors["50"].message})
    const voices = guild.voice_states
    if(voices.length === 0) return {
        channel_id: null,
        voice_state: "Disconnected"
    }
    else{
        if(!voices.find(us => us.user_id === memberid)) return {
            channel_id: null,
            voice_state: "Disconnected"
        }
        else{
            const voice = voices.find(us => us.user_id === memberid)
            const others = voices.filter(ch => ch.channel_id === voice.channel_id)
            if(memberid)return {
                member: voice,
                members: others
            }
        }
    }
}