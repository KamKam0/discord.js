const updateHandler = require('../../handlers/updateHandler')

module.exports = async (bot, newThread) => {
    const guild = bot.guilds.get(newThread.guild_id)
    
    if(!guild) return
    let oldthread = guild.threads.get(newThread.id)

    if(!oldthread){
        guild.threads._add(newThread)
        const modifiedThread = guild.threads.get(newThread.id)
        if(bot.databaseState || bot.databaseState === null) bot.emit(name(), bot, null, modifiedThread)
        return
    }

    let updateParameters = {
        name: name(),
        path: 'threads',
        guild: true,
    }

    updateHandler(updateParameters, newThread, bot)
}

function name(){ return "THREAD_UPDATE" }