const Sticker = require("../../structures/singles/sticker")
module.exports = async (bot, oldsticker, newsticker) => {
    const guild = bot.guilds.get(oldsticker.guild_id)
    if(!guild) return
    let oldsticker2 = guild.stickers.get(newsticker.id)
    if(!oldsticker2) return
    oldsticker2 = new Sticker(oldsticker2, bot)
    guild.stickers.get(newsticker.id)._modifyDatas(newsticker)
    const newsticker2 = guild.stickers.get(newsticker.id)

    let modifications = []
    let olddatas = Object.entries(oldsticker2)
    let newdatas = Object.entries(newsticker2)

    olddatas.forEach(da => {
        let filter = ["guild", "bot_token", "user", "member", "channel", "parent", "owner"]
        if(!filter.includes(da[0])){
            let comparaison = newdatas.find(e => e[0] === da[0])[1]
            if(comparaison !== da[1]) modifications.push(da[0])
        }
    })

    oldsticker2.modifications = modifications

    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, oldsticker2, newsticker2)
}

function name(){ return "GUILD_STICKER_UPDATE" }