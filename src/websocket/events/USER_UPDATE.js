const updateHandler = require('./results/updateHandler')

module.exports = async (bot, newUser) => {
    let updateParameters = {
        name: name(),
        path: 'users',
        bot: true,
    }

    updateHandler(updateParameters, newUser, bot)
}

function name(){ return "USER_UPDATE" }