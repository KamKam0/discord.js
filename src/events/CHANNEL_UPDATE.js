let channelTypes = require("../types/channels")

module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!datas.guild_id || !guild) return
    let oldchannel = guild.channels.get(datas.id)
    if(!oldchannel) return
    let textType = channelTypes.reverse()[datas.type]
    const channel_e = require(`../structures/singles/channel${textType.toLowerCase()}`)
    oldchannel = new channel_e({...oldchannel}, bot)
    guild.channels.get(datas.id)._Modify_Datas(datas)
    bot.channels.get(datas.id)._Modify_Datas(datas)
    let newchannel = guild.channels.get(datas.id)
    
    let modifications = []
    let olddatas = Object.entries(oldchannel)
    let newdatas = Object.entries(newchannel)

    olddatas.forEach(da => {
        let filter = ["guild", "bot_token", "user", "member", "channel", "parent", "owner"]
        if(!filter.includes(da[0])){
            let comparaison = newdatas.find(e => e[0] === da[0])[1]
            if(da[0] === "permission_overwrites"){
                let newperms = comparaison
                let oldperms = da[1]
                newperms.forEach(newperm => {
                    let oldperm = oldperms.find(e => e.id === newperm.id)
                    if(!oldperm) modifications.push(da[0])
                    else if(oldperm.allow !== newperm.allow || oldperm.deny !== newperm.deny) modifications.push(da[0])
                })
                oldperms.forEach(oldperm => {
                    let newperm = newperms.find(e => e.id === oldperm.id)
                    if(!newperm) modifications.push(da[0])
                })
            }else if(comparaison !== da[1]) modifications.push(da[0])
        }
    })

    oldchannel.modifications = modifications


    if(bot.database_state !== "unstable") bot.emit(name(), bot, oldchannel, newchannel)
}

function name(){ return "CHANNEL_UPDATE" }