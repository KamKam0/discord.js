const Stage = require("../../structures/singles/stageinstance")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    let oldevent = guild.stage_instances.get(datas.id)
    oldevent = new Stage(oldevent, bot)
    guild.stage_instances._modify(datas)
    const newevent = guild.stage_instances.get(datas.id)

    let modifications = []
    let olddatas = Object.entries(oldevent)
    let newdatas = Object.entries(newevent)

    olddatas.forEach(da => {
        let filter = ["guild", "bot_token", "user", "member", "channel", "parent", "owner"]
        if(!filter.includes(da[0])){
            let comparaison = newdatas.find(e => e[0] === da[0])[1]
            if(comparaison !== da[1]) modifications.push(da[0])
        }
    })

    oldevent.modifications = modifications

    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, oldevent, newevent)
}
function name(){ return "STAGE_INSTANCE_UPDATE" }