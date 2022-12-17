module.exports = (bot, guild_id, memberid) => {
    if(!bot) return ({code: require("../DB/errors.json")["34"].code, message: require("../DB/errors.json")["34"].message})
    if(!guild_id) return ({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message})
    const guild = bot.guilds.get(guild_id)
    if(!guild) return ({code: require("../DB/errors.json")["50"].code, message: require("../DB/errors.json")["50"].message})
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