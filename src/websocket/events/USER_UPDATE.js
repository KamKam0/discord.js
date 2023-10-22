const updateHandler = require('../../handlers/updateHandler')

module.exports = async (bot, newUser) => {
    let updateParameters = {
        name: name(),
        path: 'users',
        bot: true,
    }

    if (newUser.user) {
        newUser = newUser.user
    }

    updateHandler(updateParameters, newUser, bot)
}

function name(){ return "USER_UPDATE" }