let types = {
    "Incoming": 1,
    "ChannelFollower": 2,
    "Application": 3
}

module.exports.types = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypes(types)
}