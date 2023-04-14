const Emoji = require(`../../structures/singles/emoji`)
module.exports = async (bot, oldemoji, newemoji) => {
    const guild = bot.guilds.get(newemoji.guild_id)
    let oldemoji2 = guild.emojis.get(oldemoji.id)
    if(!oldemoji2) return
    oldemoji2 = new Emoji(oldemoji2, bot)
    guild.emojis._modify(newemoji)
    let newemoji2 = guild.emojis.get(oldemoji.id)

    let modifications = []
    let olddatas = Object.entries(oldemoji2)
    let newdatas = Object.entries(newemoji2)

    olddatas.forEach(da => {
        let filter = ["guild", "bot_token", "user", "member", "channel", "parent", "owner"]
        if(!filter.includes(da[0])){
            let comparaison = newdatas.find(e => e[0] === da[0])[1]
            if(comparaison !== da[1]) modifications.push(da[0])
        }
    })

    oldemoji2.modifications = modifications

    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, oldemoji2, newemoji2)
}

function name(){ return "GUILD_EMOJI_UPDATE" }