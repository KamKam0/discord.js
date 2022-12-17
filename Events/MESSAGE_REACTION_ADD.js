const reactionadd = require("../Event Result/MessageReactionAdd")
module.exports = async (bot, datas) => {
    if(bot.discordjs.awaitEmojis.filter(ti => ti.msgID === datas.message_id)[0]){
        
        let v = bot.discordjs.awaitEmojis.filter(ti => ti.msgID === datas.message_id)
        
        v.forEach(vi => {
            
            let st = "ok"
            if(vi.id_u){
                
                if(datas.user_id === vi.id_u) st = 'ok'
                else st = "er"
                
            } 
            if(vi.id_em){
                
                if(datas.emoji.id === vi.id_em) st = "ok"
                else st = "er"
                
            } 
            if(vi.id_name){
                
                if(vi.id_name.includes[datas.emoji.name]) st = "ok"
                else st = "er"
                
            }
            if(st === "ok") vi.emojis.push(datas)
        })
        
        if(v.filter(vi => vi.emojis.length === vi.nbre)[0]){
            
            v.filter(vi => vi.emojis.length === vi.nbre).forEach(de => {
                clearTimeout(de.timeout)
                if(de.Category === "Events") require(`${process.cwd()}/Handler/Events/${de.cmdName}`)(bot, de.Datas, de.emojis, "success")
                else  require(`${process.cwd()}/Handler/commands ${de.Category}/${de.cmdName}`).execute(bot, de.Datas, de.emojis, "success")
                
                bot.discordjs.awaitEmojis = bot.discordjs.awaitEmojis.filter(d => d.Date !== de.Date)
            })
        }
    }

    const guild = bot.guilds.get(datas.guild_id)
    if(guild) if(bot.database_state === "stable") bot.emit(name(), bot, (new reactionadd({...datas})).SetGuild(guild).SetChannel(guild.channels.get(datas.channel_id)).SetMember(guild.members.get(datas.user_id)).SetUser(bot.users.get(datas.user_id)))
    else if(bot.database_state === "stable") bot.emit(name(), bot, (new reactionadd(datas)))
}

function name(){ return "MESSAGE_REACTION_ADD" }