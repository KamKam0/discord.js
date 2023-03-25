let types = {
    "RemoveRole": 0,
    "Kick": 1
}

module.exports.types = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypes(types)
}