let types = {
    Short: 1,
    Long: 2
}

module.exports = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypes(types)
}