const updateHandler = require('./results/updateHandler')

module.exports = async (bot, newMember) => {
    newMember.user_id = newMember.user?.id

    let updateParameters = {
        name: name(),
        path: 'members',
        guild: true,
    }

    const modifications = updateHandler(updateParameters, newMember, bot)
    
    if(!modifications) return require("./USER_UPDATE")(bot, newMember.user)
}

function name(){ return "GUILD_MEMBER_UPDATE" }