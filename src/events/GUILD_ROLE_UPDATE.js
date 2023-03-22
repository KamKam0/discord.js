module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    
    if(!datas.guild_id || !guild) return
    
    let oldrole = guild.roles.get(datas.role.id)
    
    if(!oldrole) return
    const role_e = require(`../Gestionnaires/Individual/Role`)
    oldrole = new role_e({...oldrole}, bot)

    guild.roles.get(datas.role.id)._Modify_Datas(datas.role)
    const newrole = guild.roles.get(datas.role.id)

    let modifications = []
    let olddatas = Object.entries(oldrole)
    let newdatas = Object.entries(newrole)

    olddatas.forEach(da => {
        let filter = ["guild", "bot_token", "user", "member", "channel", "parent", "owner"]
        if(!filter.includes(da[0])){
            let comparaison = newdatas.find(e => e[0] === da[0])[1]
            if(comparaison !== da[1]) modifications.push(da[0])
        }
    })

    oldrole.modifications = modifications
    if(bot.database_state !== "unstable") bot.emit(name(), bot, oldrole, newrole)
}

function name(){ return "GUILD_ROLE_UPDATE" }