const Voice = require("../../structures/singles/voice")
module.exports = async (bot, oldvoice, newvoice) => {
    const guild = bot.guilds.get(oldvoice.guild_id)
    let oldvoice2 = guild.voice_states.get(newvoice.user_id)
    oldvoice2 = new Voice(oldvoice2, bot)
    guild.voice_states._modify(newvoice)
    const newvoice2 = guild.voice_states.get(newvoice.user_id)
    guild.members.get(newvoice.user_id).voice = {presence: newvoice2, channel: newvoice2?.channel || null}
    
    guild.channels.get(oldvoice.channel_id).members._delete(newvoice.user_id)
    guild.channels.get(newvoice.channel_id).members.container.push(guild.members.get(newvoice.user_id))


    let modifications = []
    let olddatas = Object.entries(oldvoice2)
    let newdatas = Object.entries(newvoice2)

    olddatas.forEach(da => {
        let filter = ["guild", "bot_token", "user", "member", "channel", "parent", "owner"]
        if(!filter.includes(da[0])){
            let comparaison = newdatas.find(e => e[0] === da[0])[1]
            if(comparaison !== da[1]) modifications.push(da[0])
        }
    })

    oldvoice2.modifications = modifications
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, oldvoice2, newvoice2)
}

function name(){ return "VOICE_UPDATE" }