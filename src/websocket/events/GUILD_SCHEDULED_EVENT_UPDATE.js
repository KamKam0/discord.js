module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    
    if(!datas.guild_id || !guild) return
    
    let oldevent = guild.guild_scheduled_events.get(datas.id)
    
    if(!oldevent) return
    const event_e = require("../../structures/singles/event")
    oldevent = new event_e(oldevent, bot)

    guild.guild_scheduled_events.get(datas.id)._Modify_Datas(datas)

    const newevent = guild.guild_scheduled_events.get(datas.id)

    let modifications = []
    let olddatas = Object.entries(oldevent)
    let newdatas = Object.entries(newevent)

    olddatas.forEach(da => {
        let filter = ["guild", "bot_token", "user", "member", "channel", "parent", "owner"]
        if(!filter.includes(da[0])){
            let comparaison = newdatas.find(e => e[0] === da[0])[1]
            if(comparaison !== da[1]) modifications.push(da[0])
        }
    })

    oldevent.modifications = modifications


    if(bot.databaseState !== "unstable") bot.emit(name(), bot, oldevent, newevent)
}
    
function name(){ return "GUILD_SCHEDULED_EVENT_UPDATE" }