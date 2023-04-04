const Message = require("../../structures/singles/message")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id || !guild) return
    let oldmessage = guild.messages.get(datas.id)
    if(!oldmessage){
        const mess_u_p = new Message(datas, bot)
        if(bot.databaseState) return bot.emit(name(), bot, mess_u_p)
    }
    else{
        oldmessage = new Message(oldmessage, bot)
        guild.messages.get(datas.id)._modifyDatas(datas)
        const newmessage = guild.messages.get(datas.id)
    
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
    
        if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, oldmessage, newmessage)
    }
    
}

function name(){ return "MESSAGE_UPDATE" }