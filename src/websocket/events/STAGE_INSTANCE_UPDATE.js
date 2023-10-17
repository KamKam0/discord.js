const updateHandler = require('./results/updateHandler')

module.exports = async (bot, newStage) => {
    let updateParameters = {
        name: name(),
        path: 'stage_instances',
        guild: true,
    }

    updateHandler(updateParameters, newStage, bot)
}

function name(){ return "STAGE_INSTANCE_UPDATE" }