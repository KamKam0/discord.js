let types = {
    Stream: 1,
    EmbeddedApplication
}

module.exports = types

module.exports.revert = () => {
    return require("../Utils/functions").general.revertTypess(types)
}