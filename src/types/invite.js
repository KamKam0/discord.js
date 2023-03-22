let types = {
    Stream: 1,
    EmbeddedApplication
}

module.exports = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypess(types)
}