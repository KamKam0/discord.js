module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    
    if(!datas.guild_id || !guild) return
  
    let oldmember = guild.members.get(datas.user.id)
    if(!oldmember) return

    let modifications = []
    let olddatas = Object.entries(oldmember)
    let newdatas = Object.entries(new (require(`../Gestionnaires/Individual/Member`))(datas, bot))

    olddatas.forEach(da => {
        let filter = ["guild", "bot_token", "user", "member", "channel", "parent", "owner", "vguild_id"]
        if(!filter.includes(da[0])){
            let comparaison = newdatas.find(e => e[0] === da[0])[1]
            if(da[0] === "roles"){
                let t1 = comparaison.filter(role => !da[1].includes(role))
                if(t1[0]) modifications.push("roles")
            
                let t2 = da[1].filter(role => !comparaison.includes(role))
                if(t2[0]) modifications.push("roles")
            }
            else if(comparaison !== da[1]) modifications.push(da[0])
        }
    })
    
    if(!modifications[0]) return require("./USER_UPDATE")(bot, datas.user)
    else{
        const member_e = require(`../Gestionnaires/Individual/Member`)
        oldmember = new member_e({...oldmember})
        guild.members.get(datas.user.id).Modify_Datas(datas)
        const newmember = guild.members.get(datas.user.id)
        oldmember.modifications = modifications
        if(bot.database_state === "stable") bot.emit(name(), bot, oldmember, newmember)
    }
}

function name(){ return "GUILD_MEMBER_UPDATE" }