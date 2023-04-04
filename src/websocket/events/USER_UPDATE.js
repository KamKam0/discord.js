const User = require("../../structures/singles/user")
module.exports = async (bot, datas) => {
    let olduser = bot.users.get(datas.id)

    if(!olduser) return
    olduser = new User(olduser, bot)

    bot.users.get(datas.id)._modifyDatas(datas)
    
    const newuser = bot.users.get(datas.id)

    if(olduser.id === bot.user.id) bot.user._modifyDatas(datas)


    let modifications = []
    let olddatas = Object.entries(olduser)
    let newdatas = Object.entries(newuser)

    olddatas.forEach(da => {
        let filter = ["guild", "bot_token", "user", "member", "channel", "parent", "owner"]
        if(!filter.includes(da[0])){
            let comparaison = newdatas.find(e => e[0] === da[0])[1]
            if(comparaison !== da[1]) modifications.push(da[0])
        }
    })

    olduser.modifications = modifications

    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, olduser, newuser)
}

function name(){ return "USER_UPDATE" }