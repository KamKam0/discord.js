const errors = require("../utils/errors.json")

module.exports = (bot, guild_id, memberid) => {
    if(!bot) return ({code: errors["34"].code, message: errors["34"].message})
    if(!guild_id) return ({code: errors["1"].code, message: errors["1"].message})
    if(!memberid) return ({code: errors["4"].code, message: errors["4"].message})
    const guild = bot.guilds.get(guild_id)
    if(!guild) return ({code: errors["50"].code, message: errors["50"].message})
    const voices = guild.voice_states
    if(voices.length === 0) return {
        me: {
            channel_id: null,
            voice_state: "Disconnected"
        },
        member: {
            channel_id: null,
            voice_state: "Disconnected"
        }
    }
    else{
        let compo = {

            me: {
                channel_id: null,
                voice_state: "Disconnected"
            },
            member: {
                channel_id: null,
                voice_state: "Disconnected"
            }
        }
        const voice = voices.find(us => us.user_id === bot.user.id)
            const others = voices.find(us => us.user_id === memberid)
            if(voice) compo.me = voice
            if(others) compo.member = others
            return compo
    }
}