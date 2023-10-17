module.exports = (eventData, data, bot) => {
    let isGuild = eventData.name === 'GUILD_UPDATE'
    let modifications;

    if (eventData.guild) {
        const guild = bot.guilds.get(data.guild_id)
        if (!guild) return null
        
        modifications = guild[eventData.path]._modify(data, isGuild)
    }

    if (eventData.bot) {
        const localModifications = bot[eventData.path]._modify(data, isGuild)
        
        if (!eventData.guild) modifications = localModifications
    }

    if (!modifications) return null

    if(bot.databaseState || bot.databaseState === null) bot.emit(eventData.name, bot, modifications.oldInstance, modifications.newInstance)

    return modifications
}