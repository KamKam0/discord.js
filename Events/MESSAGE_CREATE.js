const Message = require("../Gestionnaires/Individual/Message")
module.exports = async (bot, datas) => {
    if(bot.discordjs.awaitMessages.filter(ti => ti.chID === datas.channel_id)[0]){
        let v = bot.discordjs.awaitMessages.filter(ti => ti.chID === datas.channel_id)
        v.forEach(vi => {
            if(vi.id) if(datas.author.id === vi.id) vi.messages.push(datas)
        })
        if(v.filter(vi => vi.messages.length === vi.nbre)[0]){
            v.filter(vi => vi.messages.length === vi.nbre).forEach(de => {
                clearTimeout(de.timeout)
                if(de.Category === "Events") require(`${process.cwd()}/Handler/Events/${de.cmdName}`)(bot, de.Datas, de.messages, "success")
                else  require(`${process.cwd()}/Handler/commands ${de.Category}/${de.cmdName}`).command.execute(bot, de.Datas, de.messages, "success")
                
                bot.discordjs.awaitMessages = bot.discordjs.awaitMessages.filter(d => d.Date !== de.Date)
            })
        }
    }
    
    const guild = bot.guilds.get(datas.guild_id)
    datas.token = bot.discordjs.token
    const message = new Message(datas)
    if(guild) guild.messages.AddMessage(datas)
    if(!guild) if(bot.database_state === "stable") bot.emit(name(), bot, message.SetUser(bot.users.get(message.user_id)).SetChannel(bot.channels.get(datas.channel_id)))
    if(guild) if(bot.database_state === "stable") bot.emit(name(), bot, guild.messages.get(datas.id))
}

function name(){ return "MESSAGE_CREATE" }