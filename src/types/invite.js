let types = {
    Stream: 1,
    EmbeddedApplication
}

module.exports.types = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypes(types)
}