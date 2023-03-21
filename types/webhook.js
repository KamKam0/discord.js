let types = {
    "Incoming": 1,
    "ChannelFollower": 2,
    "Application": 3
}

module.exports = types

module.exports.revert = () => {
    return require("../Utils/functions").general.revertTypess(types)
}