let types = {
    "RemoveRole": 0,
    "Kick": 1
}

module.exports = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypess(types)
}