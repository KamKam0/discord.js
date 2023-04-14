const Roles = require("../../structures/singles/role")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    datas = {...datas.role, guild_id: datas.guild_id}
    if(!datas.guild_id || !guild) return
    
    let oldrole = guild.roles.get(datas.id)
    
    if(!oldrole) return
    oldrole = new Roles(oldrole, bot)

    guild.roles._modify(datas)
    const newrole = guild.roles.get(datas.id)

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
    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, oldrole, newrole)
}

function name(){ return "GUILD_ROLE_UPDATE" }