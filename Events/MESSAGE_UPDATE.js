module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id || !guild) return
    let oldmessage = guild.messages.get(datas.id)
    if(!oldmessage){
        const mess_u_p = new (require("../Event Result/MessageDelete"))(datas, bot)
        mess_u_p.SetChannel(bot.channels.get(datas.channel_id))
        mess_u_p.SetGuild(bot.guilds.get(datas.guild_id))
        if(bot.database_state === "stable") return bot.emit(name(), bot, mess_u_p)
    }
    else{
        const message_e = require(`../Gestionnaires/Individual/Message`)
        oldmessage = new message_e({...oldmessage}, bot)
        guild.messages.get(datas.id).Modify_Datas(datas)
        const newmessage = guild.messages.get(datas.id)
        if(!guild){
            newmessage.SetUser(bot.users.get(datas.user_id))
            newmessage.SetChannel(bot.channels.get(datas.channel_id))
            oldmessage.SetUser(bot.users.get(datas.user_id))
            oldmessage.SetChannel(bot.channels.get(datas.channel_id))
        }
    
        let modifications = []
        let olddatas = Object.entries(oldmessage)
        let newdatas = Object.entries(newmessage)
    
        olddatas.forEach(da => {
            let filter = ["guild", "bot_token", "user", "member", "channel", "parent", "owner"]
            if(!filter.includes(da[0])){
                let comparaison = newdatas.find(e => e[0] === da[0])[1]
                if(comparaison !== da[1]) modifications.push(da[0])
            }
        })
    
        oldmessage.modifications = modifications
    
        if(bot.database_state === "stable") bot.emit(name(), bot, oldmessage, newmessage)
    }
    
}

function name(){ return "MESSAGE_UPDATE" }