module.exports = async (bot, datas) => {
    const guild_e = require("../Gestionnaires/Individual/Guild")
    let oldguild = bot.guilds.get(datas.id)
    oldguild = new guild_e({...oldguild}, bot)

    if(!datas.id|| !oldguild) return
  
    bot.guilds.get(datas.id).__Modify_Datas(datas)
  
    const newguild = bot.guilds.get(datas.id)

    let modifications = []
    let olddatas = Object.entries(oldguild)
    let newdatas = Object.entries(newguild)

    olddatas.forEach(da => {
        let filter = ["guild", "bot_token", "user", "member", "channel", "parent", "owner", "permissions", "roles", "emojis", "voice_states", "members", "channels", "threads", "presences", "stage_instances", "stickers", "guild_scheduled_events"]
        if(!filter.includes(da[0])){
            let comparaison = newdatas.find(e => e[0] === da[0])[1]
            if(comparaison !== da[1]) modifications.push(da[0])
        }
    })

    oldguild.modifications = modifications
    
    if(bot.database_state !== "unstable") bot.emit(name(), bot, oldguild, newguild)
}

function name(){ return "GUILD_UPDATE" }