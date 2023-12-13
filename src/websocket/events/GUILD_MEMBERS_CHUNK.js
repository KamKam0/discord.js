const Members = require('../../structures/managers/members')
const Presences = require('../../structures/managers/presences')

module.exports = async (bot, datas) => {
    let guild = bot.guilds.get(datas.guild_id)
    let presences = new Presences(bot, guild.id)
    presences._addMultiple(datas.presences)
    let members = new Members(bot, guild.id)
    members._addMultiple(datas.members)
    
    let dataToReturn = {
        ...datas,
        guild,
        presences,
        members
    }

    if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, dataToReturn)
}

function name(){ return "GUILD_MEMBERS_CHUNK" }