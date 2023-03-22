module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    
    if(!guild) return
    let oldthread = guild.threads.get(datas.id)

    if(!oldthread){
        guild.threads._add(datas)
        const newthread2 = guild.threads.get(datas.id)
        if(bot.database_state !== "unstable") bot.emit(name(), bot, null, newthread2)
        return
    }

    const thread_e = require(`../Gestionnaires/Individual/Channels_/Channel_11`)
    oldthread = new thread_e({...oldthread}, bot)

    guild.threads.get(datas.id)._Modify_Datas(datas)

    const newthread = guild.threads.get(datas.id)

    let modifications = []
    let olddatas = Object.entries(oldthread)
    let newdatas = Object.entries(newthread)

    olddatas.forEach(da => {
        let filter = ["guild", "bot_token", "user", "member", "channel", "parent", "owner"]
        if(!filter.includes(da[0])){
            let comparaison = newdatas.find(e => e[0] === da[0])[1]
            if(comparaison !== da[1]) modifications.push(da[0])
        }
    })

    oldthread.modifications = modifications

    if(bot.database_state !== "unstable") bot.emit(name(), bot, oldthread, newthread)
}

function name(){ return "THREAD_UPDATE" }