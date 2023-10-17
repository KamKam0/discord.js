const updateHandler = require('./results/updateHandler')

module.exports = async (bot, newRole) => {
    newRole = {...newRole.role, guild_id: newRole.guild_id}
    
    let updateParameters = {
        name: name(),
        path: 'roles',
        guild: true,
    }

    updateHandler(updateParameters, newRole, bot)
}

function name(){ return "GUILD_ROLE_UPDATE" }