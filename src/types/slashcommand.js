let types = {
    Guild:	0,
    BotDm: 1,
    PrivateChannel: 2
}

module.exports.types = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypes(types)
}